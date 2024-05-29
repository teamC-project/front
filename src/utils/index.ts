export const base64ToFile = (base64: string, type: string) => {
  const base64Data = base64.split(',')[1];
  const binaryString = atob(base64Data);

  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

	const filename = 'aaa' + (type === 'image/jpeg' ? '.jpg' : '.png');

  const blob = new Blob([bytes], { type });
  const file = new File([blob], filename, { type });

  return file;
}
