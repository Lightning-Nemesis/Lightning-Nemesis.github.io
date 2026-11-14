import { render, screen } from '@testing-library/react';
import SkillsPage from './SkillsPage';

const mode = (rating, best) => ({ last: { rating }, best: { rating: best } });

afterEach(() => {
  delete global.fetch;
});

test('shows the stack, awards and live Chess.com ratings', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ chess_rapid: mode(1276, 1439), chess_blitz: mode(1169, 1203), chess_bullet: mode(1128, 1203) }),
  });
  render(<SkillsPage />);
  expect(screen.getByText('Hypothesis Testing')).toBeInTheDocument();
  expect(screen.getByText(/Visual AI Hackathon/)).toBeInTheDocument();
  expect(await screen.findByText('1276')).toBeInTheDocument();
  expect(screen.getByText('Best 1439')).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledWith('https://api.chess.com/pub/player/lightningnemesis/stats');
});

test('says so when Chess.com cannot be reached', async () => {
  global.fetch = jest.fn().mockRejectedValue(new Error('offline'));
  render(<SkillsPage />);
  expect(await screen.findAllByText('Unavailable right now')).toHaveLength(3);
});
