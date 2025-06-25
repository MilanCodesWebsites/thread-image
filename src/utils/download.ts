export const downloadImage = async (imageUrl: string, filename: string) => {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download error:', error);
    // Fallback: open image in new tab
    window.open(imageUrl, '_blank');
  }
};

export const getImageFilename = (url: string, prefix: string = 'image') => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const extension = pathname.split('.').pop() || 'jpg';
    const timestamp = Date.now();
    return `${prefix}-${timestamp}.${extension}`;
  } catch {
    return `${prefix}-${Date.now()}.jpg`;
  }
};