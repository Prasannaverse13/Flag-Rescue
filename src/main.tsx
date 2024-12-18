// Learn more at developers.reddit.com/docs
import { Devvit, useState, useEffect } from '@devvit/public-api';

Devvit.configure({
  redditAPI: true,
});

// Add a menu item to the subreddit menu for instantiating the new experience post
Devvit.addMenuItem({
  label: 'High-Risk Gameplay',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    ui.showToast("Submitting your post - upon completion you'll navigate there.");

    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitPost({
      title: 'My devvit post',
      subredditName: subreddit.name,
      // The preview appears while the post loads
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading ...</text>
        </vstack>
      ),
    });
    ui.navigateTo(post);
  },
});

// Add a post type definition
Devvit.addCustomPostType({
  name: 'Cyber Block Puzzle',
  height: 'tall',
  render: (_context) => {
    const [score, setScore] = useState(0);
    const [gameBoard, setGameBoard] = useState<{type: 'bomb' | 'flag', revealed: boolean}[][]>([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [showInstructions, setShowInstructions] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [bombMessage, setBombMessage] = useState('');
    const [savedFlags, setSavedFlags] = useState(0);
    const [clearingFlags, setClearingFlags] = useState<{row: number, col: number}[]>([]);
    const [consecutiveSafe, setConsecutiveSafe] = useState(0);

    // List of flag emojis
    const FLAGS = ['🏁', '🎌', '🏴', '🏳️', '🚩', '⛳️'];

    // Increased bomb probability and adjusted scoring
    const BOMB_PROBABILITY = 0.35; // 35% chance for bombs
    const FLAG_SCORE = 25; // Increased points per flag
    const CONSECUTIVE_BONUS = 15; // Bonus points for consecutive safe reveals

    // Bomb messages for variety
    const BOMB_MESSAGES = [
      "💥 BOOM! The bomb exploded!",
      "💣 Oh no! You triggered a bomb!",
      "⚠️ Mission failed - bomb detected!",
      "🚫 Critical error: Bomb detonation!",
      "❌ Explosion detected - mission aborted!"
    ];

    // Hidden block symbols for variety (instead of empty blocks)
    const HIDDEN_SYMBOLS = ['❓', '❔', '⬜️', '⬛️', '▢'];

    // Initialize game board with more bombs
    const initBoard = () => {
      const blocks = Array(6).fill(null).map(() => 
        Array(6).fill(null).map(() => ({
          // 35% chance of spawning a bomb
          type: Math.random() < BOMB_PROBABILITY ? 'bomb' : 'flag',
          revealed: false
        }))
      );
      setGameBoard(blocks);
      setScore(0);
      setSavedFlags(0);
      setConsecutiveSafe(0);
      setGameStarted(true);
      setGameOver(false);
      setClearingFlags([]);
    };

    // Handle flag selection with consecutive bonus
    const handleFlagPress = async (row: number, col: number) => {
      if (!gameStarted || gameOver || clearingFlags.length > 0) return;
      
      const clickedBlock = gameBoard[row][col];
      
      if (clickedBlock.revealed) return;

      const newBoard = [...gameBoard];
      newBoard[row][col] = { ...clickedBlock, revealed: true };
      setGameBoard(newBoard);

      if (clickedBlock.type === 'bomb') {
        // Set random bomb message
        setBombMessage(BOMB_MESSAGES[Math.floor(Math.random() * BOMB_MESSAGES.length)]);
        setGameOver(true);
        
        // Reveal all bombs with delay for dramatic effect
        setTimeout(() => {
          const finalBoard = gameBoard.map(row => 
            row.map(block => 
              block.type === 'bomb' ? { ...block, revealed: true } : block
            )
          );
          setGameBoard(finalBoard);
        }, 500);
        return;
      }

      // Calculate score with consecutive bonus
      const bonus = consecutiveSafe * CONSECUTIVE_BONUS;
      setScore(prev => prev + FLAG_SCORE + bonus);
      setConsecutiveSafe(prev => prev + 1);
      setSavedFlags(prev => prev + 1);

      // Check for game win
      const totalFlags = gameBoard.flat().filter(block => block.type === 'flag').length;
      if (savedFlags + 1 === totalFlags) {
        // Additional bonus for completing the game
        setScore(prev => prev + 500);
        setGameOver(true);
        const finalBoard = gameBoard.map(row => 
          row.map(block => ({ ...block, revealed: true }))
        );
        setGameBoard(finalBoard);
      }
    };

    return (
      <vstack height="100%" width="100%" gap="medium" alignment="center middle" 
              backgroundColor="#1a1a2e" padding="large">
        <text size="xlarge" color="#00ff9f" weight="bold">High-Risk Flag Rescue</text>
        
        {showInstructions ? (
          <vstack gap="medium" padding="medium" backgroundColor="#2a2a4e" borderRadius="medium">
            <text size="large" color="#fff">⚠️ High-Risk Mission Briefing:</text>
            <text color="#ccc">• Heavy bomb presence in the field (35%)</text>
            <text color="#ccc">• Each rescued flag: {FLAG_SCORE} points</text>
            <text color="#ccc">• Consecutive safe reveals earn bonus points</text>
            <text color="#ccc">• Complete mission bonus: 500 points</text>
            <text color="#ff3366">• WARNING: High bomb density!</text>
            <button appearance="primary" 
                    onPress={() => {
                      setShowInstructions(false);
                      initBoard();
                    }}>
              Accept Mission
            </button>
          </vstack>
        ) : (
          <vstack gap="medium">
            <hstack gap="large">
              <text size="large" color="#00ff9f">Score: {score}</text>
              <text size="large" color="#00ff9f">Flags: {savedFlags}</text>
              {consecutiveSafe > 1 && (
                <text size="large" color="#33ccff">Streak: x{consecutiveSafe}</text>
              )}
            </hstack>
            
            {gameOver ? (
              <vstack gap="medium" padding="medium" backgroundColor="#2a2a4e" borderRadius="medium">
                {bombMessage ? (
                  <vstack gap="small">
                    <text size="large" color="#ff3366">{bombMessage}</text>
                    <text color="#fff">Final Score: {score}</text>
                  </vstack>
                ) : (
                  <vstack gap="small">
                    <text size="large" color="#00ff9f">Mission Accomplished!</text>
                    <text color="#fff">Final Score: {score}</text>
                  </vstack>
                )}
                <button appearance="primary" onPress={() => initBoard()}>
                  New Mission
                </button>
              </vstack>
            ) : (
              <hstack backgroundColor="#2a2a4e" padding="medium" borderRadius="medium">
                {gameBoard.map((row, rowIndex) => (
                  <vstack key={rowIndex}>
                    {row.map((block, colIndex) => (
                      <button
                        key={`${rowIndex}-${colIndex}`}
                        onPress={() => handleFlagPress(rowIndex, colIndex)}
                        style={{
                          width: '40px',
                          height: '40px',
                          margin: '2px',
                          backgroundColor: block.revealed ? 
                            (block.type === 'bomb' ? '#ff3366' : '#2a2a4e') : 
                            '#4a4a6e',
                          borderRadius: '4px',
                          transition: 'all 0.3s ease',
                          border: block.revealed ? 'none' : '2px solid #6a6a8e',
                        }}
                      >
                        {block.revealed ? 
                          (block.type === 'bomb' ? '💥' : FLAGS[Math.floor(Math.random() * FLAGS.length)]) :
                          HIDDEN_SYMBOLS[Math.floor(Math.random() * HIDDEN_SYMBOLS.length)]
                        }
                      </button>
                    ))}
                  </vstack>
                ))}
              </hstack>
            )}

            <hstack gap="medium">
              <button appearance="primary" onPress={() => initBoard()}>
                Restart Mission
              </button>
              <button appearance="secondary" 
                      onPress={() => setShowInstructions(true)}>
                Mission Brief
              </button>
            </hstack>
          </vstack>
        )}
      </vstack>
    );
  },
});

export default Devvit;
