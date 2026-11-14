// Text with its figures ("40%", "5–6", "120+", "2M", "4×") wrapped in <strong>, so they can take the accent colour.
// Digits that are part of a name (GSM8K, EC2, LLaMA 3B, NDCG@5) are left alone.
export default function numbersMarked(text) {
  return text
    .split(/((?<![\w@.])\d+(?:[.,–]\d+)*[%+MK×]*(?![A-Za-z]))/)
    .map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part));
}
