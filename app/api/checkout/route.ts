import { NextRequest, NextResponse } from 'next/server';
import { WaffoPancake, WaffoPancakeError } from '@waffo/pancake-ts';

// 检查是否配置了 Waffo 环境变量
const isWaffoConfigured = () => {
  return process.env.WAFFO_MERCHANT_ID && process.env.WAFFO_PRIVATE_KEY;
};

export async function POST(request: NextRequest) {
  try {
    // 如果没有配置 Waffo，返回测试模式响应
    if (!isWaffoConfigured()) {
      console.warn('⚠️ Waffo Pancake not configured. Running in test mode.');
      const { productId } = await request.json();
      
      // 返回测试 checkout URL（指向 Waffo 测试页面）
      return NextResponse.json({
        checkoutUrl: 'https://checkout.waffo.com/test-mode',
        testMode: true,
        message: 'Waffo Pancake not configured. Please add WAFFO_MERCHANT_ID and WAFFO_PRIVATE_KEY environment variables.',
      });
    }

    // 在运行时初始化 Waffo 客户端（避免在构建时实例化）
    const client = new WaffoPancake({
      merchantId: process.env.WAFFO_MERCHANT_ID!,
      privateKey: process.env.WAFFO_PRIVATE_KEY!,
    });

    const { productId, email, metadata } = await request.json();

    // 创建 checkout session（storeId 从 API 密钥自动推断）
    const session = await client.checkout.createSession({
      productId,
      currency: 'USD',
      buyerEmail: email || undefined,
      metadata,
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
    });

    return NextResponse.json({ checkoutUrl: session.checkoutUrl });
  } catch (error) {
    if (error instanceof WaffoPancakeError) {
      return NextResponse.json(
        { error: error.errors[0]?.message },
        { status: error.status }
      );
    }
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
