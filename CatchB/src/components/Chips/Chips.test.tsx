import { render } from '@testing-library/react-native';

import { CoachTypeChip } from './CoachTypeChip';

describe('<CoachTypeChip />', () => {
  it('renders academy coach correctly', () => {
    render(<CoachTypeChip is_academy_coach />);
  });

  
  it('renders catchb coach correctly', () => {
    render(<CoachTypeChip is_academy_coach={false} />);
  });
});
