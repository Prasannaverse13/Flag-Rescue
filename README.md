# Flag Rescue - Reddit Community Game

A cyber-styled flag rescue mission game built for Reddit communities using Devvit. Players must strategically reveal flags while avoiding hidden bombs in this high-stakes puzzle game.

## 🎮 Game Features

- **High-Risk Gameplay**: Navigate through a 6x6 grid where 35% of spaces contain hidden bombs
- **Flag Collection**: Rescue flags to earn points and achieve the highest score
- **Scoring System**:
  - 25 points per rescued flag
  - Bonus points for consecutive safe reveals
  - 500 points bonus for completing the mission
- **Modern Cyber Design**: Sleek UI with dynamic animations and visual feedback
- **Progressive Difficulty**: Strategic gameplay with increasing risk/reward decisions

## 🎯 How to Play

1. Click "High-Risk Gameplay" in your subreddit's menu to create a new game instance
2. Read the mission briefing for game instructions
3. Click grid spaces to reveal what's hidden:
   - Find a flag: Earn points and continue playing
   - Hit a bomb: Game Over!
4. Try to rescue all flags while avoiding bombs
5. Build consecutive streaks for bonus points

## 🛠️ Technical Details

### Prerequisites

- Reddit Moderator Access
- Devvit Development Environment


## 🎨 Customization

You can modify various game parameters in `main.tsx`:

- `BOMB_PROBABILITY`: Adjust bomb frequency (default: 0.35)
- `FLAG_SCORE`: Change points per flag (default: 25)
- `CONSECUTIVE_BONUS`: Modify streak bonus points (default: 15)
- `FLAGS`: Add or modify flag emojis
- `BOMB_MESSAGES`: Customize bomb trigger messages
- `HIDDEN_SYMBOLS`: Change unrevealed block symbols

## 🔥 Features

- **Dynamic Scoring System**
  - Base points for flag collection
  - Streak multipliers
  - Completion bonus

- **Visual Feedback**
  - Animated reveals
  - Bomb explosion effects
  - Score tracking
  - Streak counter

- **Game States**
  - Instructions screen
  - Active gameplay
  - Game over with different end conditions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 APP

- App Link: [block-puzzle-0](https://developers.reddit.com/apps/block-puzzle-0)


## 🙏 Acknowledgments

- Built with [Devvit](https://developers.reddit.com/docs/devvit)
- Inspired by classic minesweeper-style games
- Created for Reddit communities

## 🐛 Known Issues

- None currently reported

## 📫 Contact

For questions or feedback, please open an issue in the repository.

---

Made with ❤️ for Reddit Communities