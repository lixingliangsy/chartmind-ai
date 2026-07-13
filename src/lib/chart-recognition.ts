// src/lib/chart-recognition.ts
// Note

export interface ChartRecognitionResult {
  chartType: string;
  confidence: number;
  detectedFeatures: string[];
}

export interface DataExtractionResult {
  success: boolean;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
  }[];
  title?: string;
  error?: string;
}

// Note
export const CHART_TYPES = {
  BAR: 'bar',
  LINE: 'line',
  PIE: 'pie',
  DOUGHNUT: 'doughnut',
  SCATTER: 'scatter',
  RADAR: 'radar',
  STACKED_BAR: 'stackedBar',
  AREA: 'area',
  BUBBLE: 'bubble',
  POLAR: 'polarArea'
};

export class ChartRecognitionService {
  // Note
  async recognizeChart(imageFile: File | Blob): Promise<ChartRecognitionResult> {
    try {
      // Note
      const base64 = await this.fileToBase64(imageFile);
      
      // Note
      // Note
      const imageFeatures = await this.extractImageFeatures(base64);
      
      // Note
      const result = this.classifyChartType(imageFeatures);
      
      return result;
    } catch (error) {
      console.error('Chart recognition error:', error);
      return {
        chartType: 'unknown',
        confidence: 0,
        detectedFeatures: []
      };
    }
  }
  
  // Note
  async extractData(imageFile: File | Blob, chartType?: string): Promise<DataExtractionResult> {
    try {
      // Note
      // Note
      
      const recognizedType = chartType || (await this.recognizeChart(imageFile)).chartType;
      
      // Note
      // Note
      const extractedData = this.generateMockData(recognizedType);
      
      return {
        success: true,
        ...extractedData
      };
    } catch (error) {
      console.error('Data extraction error:', error);
      return {
        success: false,
        labels: [],
        datasets: [],
        error: 'Failed to extract data from chart'
      };
    }
  }
  
  // Note
  private fileToBase64(file: File | Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
  
  // Note
  private async extractImageFeatures(base64: string): Promise<number[]> {
    // Note
    // Note
    return new Promise(resolve => {
      setTimeout(() => {
        // Note
        const features = Array.from({ length: 10 }, () => Math.random());
        resolve(features);
      }, 500);
    });
  }
  
  // Note
  private classifyChartType(features: number[]): ChartRecognitionResult {
    // Note
    // Note
    
    const avgFeature = features.reduce((a, b) => a + b, 0) / features.length;
    
    let chartType = 'bar';
    let confidence = 0.7;
    const detectedFeatures: string[] = [];
    
    if (avgFeature > 0.7) {
      chartType = 'pie';
      confidence = 0.85;
      detectedFeatures.push('circular shape', 'color segments');
    } else if (avgFeature > 0.5) {
      chartType = 'line';
      confidence = 0.8;
      detectedFeatures.push('connected points', 'trend line');
    } else if (avgFeature > 0.3) {
      chartType = 'bar';
      confidence = 0.9;
      detectedFeatures.push('rectangular bars', 'categories');
    } else {
      chartType = 'scatter';
      confidence = 0.75;
      detectedFeatures.push('scattered data points', 'no connecting lines');
    }
    
    return {
      chartType,
      confidence,
      detectedFeatures
    };
  }
  
  // Note
  private generateMockData(chartType: string): { labels: string[]; datasets: any[]; title?: string } {
    switch (chartType) {
      case 'bar':
        return {
          labels: ['Product A', 'Product B', 'Product C', 'Product D'],
          datasets: [{
            label: 'Sales',
            data: [65, 59, 80, 81],
            backgroundColor: [
              'rgba(99, 102, 241, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(168, 85, 247, 0.8)',
              'rgba(192, 132, 252, 0.8)',
            ]
          }],
          title: 'Product sales comparison'
        };
        
      case 'line':
        return {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'User growth',
            data: [120, 190, 150, 220, 280, 350],
            borderColor: 'rgb(99, 102, 241)',
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
          }],
          title: 'User growth趋势'
        };
        
      case 'pie':
      case 'doughnut':
        return {
          labels: ['Direct', 'Search engines', 'Social media', 'Referrals'],
          datasets: [{
            data: [35, 40, 15, 10],
            backgroundColor: [
              'rgba(99, 102, 241, 0.85)',
              'rgba(168, 85, 247, 0.85)',
              'rgba(236, 72, 153, 0.85)',
              'rgba(34, 197, 94, 0.85)',
            ]
          }],
          title: 'Traffic sources'
        };
        
      case 'scatter':
        return {
          labels: ['Data points'],
          datasets: [{
            label: 'Correlation analysis',
            data: [
              { x: 10, y: 20 }, { x: 15, y: 25 }, { x: 20, y: 30 },
              { x: 25, y: 35 }, { x: 30, y: 42 }, { x: 35, y: 48 },
              { x: 40, y: 52 }, { x: 45, y: 58 }, { x: 50, y: 65 }
            ],
            backgroundColor: 'rgba(99, 102, 241, 0.8)',
          }],
          title: 'Correlation analysis'
        };
        
      case 'radar':
        return {
          labels: ['Speed', 'Quality', 'Price', 'Support', 'Features', 'Design'],
          datasets: [{
            label: 'Score',
            data: [85, 90, 70, 95, 80, 88],
            borderColor: 'rgb(99, 102, 241)',
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
          }],
          title: 'Performance scorecard'
        };
        
      default:
        return {
          labels: ['Category A', 'Category B', 'Category C', 'Category D'],
          datasets: [{
            label: 'Value',
            data: [65, 59, 80, 81],
            backgroundColor: 'rgba(99, 102, 241, 0.8)',
          }],
          title: 'Chart data'
        };
    }
  }
  
  // Note
  getSupportedChartTypes(): string[] {
    return Object.values(CHART_TYPES);
  }
  
  // Note
  validateImage(file: File): { valid: boolean; error?: string } {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!validTypes.includes(file.type)) {
      return {
        valid: false,
        error: '不Support的图片格式。请上传 JPG、PNG、GIF 或 WebP format的图片。'
      };
    }
    
    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'Image exceeds 10MB limit.'
      };
    }
    
    return { valid: true };
  }
}

// Note
export const chartRecognitionService = new ChartRecognitionService();
export default chartRecognitionService;
