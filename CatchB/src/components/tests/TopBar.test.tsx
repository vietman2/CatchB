import { render } from '@testing-library/react-native';

import { leftTitle, rightTitle } from '../TopBar';

describe('TopBar', () => {
  describe('leftTitle', () => {
    it('renders correctly', () => {
      const { getByText } = render(leftTitle());
      expect(getByText('Catch B')).toBeTruthy();
    });
  });

  describe('rightTitle', () => {
    it('renders correctly', () => {
      const { getByText } = render(rightTitle());
      expect(getByText('캐치비')).toBeTruthy();
    });
  });
});
