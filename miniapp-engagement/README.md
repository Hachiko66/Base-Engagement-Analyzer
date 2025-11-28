# Engagement Tracker - Farcaster Analytics Mini App

A mini app for tracking and analyzing Farcaster engagement metrics. This app allows users to check their Neynar Score, post activity, likes, comments, and other engagement metrics for different time periods.

## Features

- **Neynar Score**: View your current Neynar Score
- **Engagement Metrics**: Track posts, likes received, and comments received
- **Time Periods**: Analyze metrics for 7 days, 30 days, and 90 days
- **Follow Metrics**: View followers and following counts
- **Tipping Functionality**: Tip the developer with USDC
- **Farcaster Integration**: Secure authentication with Farcaster accounts

## Metrics Tracked

- Neynar Score
- Posts in 7, 30, and 90 days
- Likes received in 7, 30, and 90 days
- Comments received in 7, 30, and 90 days
- Total followers and following
- Total replies, recasts, and likes given

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- MiniKit SDK
- Farcaster
- Base Chain
- USDC Integration

## API Endpoints

- `GET /api/engagement?fid={fid}` - Get engagement metrics for a user
- `POST /api/engagement` - Process engagement data
- `GET /api/tip` - Get tipping configuration
- `POST /api/tip` - Process USDC tip

## Configuration

The app uses the following configuration in `minikit.config.ts`:

- Name: "Engagement Tracker"
- Category: "social"
- Tags: ["social", "analytics", "engagement", "farcaster", "metrics"]

## Deployment

This app is designed to be deployed on Vercel and integrated with the Base app platform as a mini app.

To deploy:
1. Clone the repository
2. Install dependencies: `npm install`
3. Set environment variables
4. Deploy to Vercel

## Environment Variables

- `NEXT_PUBLIC_URL` - Public URL of the deployed application
- `DEVELOPER_WALLET_ADDRESS` - Wallet address for receiving tips (set in environment)

## Integration with Base App

This mini app follows the Base app specifications and can be integrated with the Base app ecosystem through proper manifest configuration and account association.

## Development

To run the app locally:
1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Visit `http://localhost:3000`

## Security

The app uses MiniKit for secure Farcaster authentication and verifies user identity before providing engagement metrics.

## Future Enhancements

- Real-time data fetching from Neynar API
- More detailed analytics
- Custom date range selection
- Export functionality
- Comparison with other accounts
- More token support for tipping

## License

This project is licensed under the MIT License.