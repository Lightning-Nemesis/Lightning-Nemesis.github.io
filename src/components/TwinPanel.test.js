import { render, screen } from '@testing-library/react';
import { linkify } from './TwinPanel';

const show = (text) => render(<p>{linkify(text)}</p>);

test('a URL becomes a link without its scheme, trailing slash or the sentence dot', () => {
  const { container } = show('The code is on GitHub at https://github.com/Lightning-Nemesis/Grocery-Agent.');
  const a = screen.getByRole('link');
  expect(a).toHaveAttribute('href', 'https://github.com/Lightning-Nemesis/Grocery-Agent');
  expect(a).toHaveTextContent(/^github\.com\/Lightning-Nemesis\/Grocery-Agent$/);
  expect(container).toHaveTextContent('The code is on GitHub at github.com/Lightning-Nemesis/Grocery-Agent.');
});

test('several links, an email and a bare www', () => {
  show('Try https://demo.example.org/ or www.example.com, or write to someone@example.com.');
  const hrefs = screen.getAllByRole('link').map((a) => a.getAttribute('href'));
  expect(hrefs).toEqual(['https://demo.example.org/', 'https://www.example.com', 'mailto:someone@example.com']);
});

test('plain text stays text', () => {
  show('It won the Outstanding Project Award at ASU.');
  expect(screen.queryByRole('link')).toBeNull();
});
