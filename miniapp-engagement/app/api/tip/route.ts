import { NextRequest } from 'next/server';

// This is a mock API route for USDC tipping
// In a real implementation, this would connect to Coinbase Pay or other USDC transfer services
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, recipientAddress, fid } = body;
    
    // Validate required fields
    if (!amount || !recipientAddress || !fid) {
      return Response.json({ 
        error: 'Missing required fields: amount, recipientAddress, and fid are required' 
      }, { status: 400 });
    }
    
    // In a real implementation, this would connect to USDC transfer services
    // For example, using Coinbase Pay SDK or other USDC transfer mechanisms
    console.log(`Processing USDC tip: ${amount} USDC to ${recipientAddress} for FID: ${fid}`);
    
    // Mock response - in real app this would initiate actual USDC transfer
    const mockTxHash = `0x${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    
    return Response.json({ 
      success: true, 
      message: `USDC tip of ${amount} USDC sent successfully!`,
      transactionHash: mockTxHash,
      recipient: recipientAddress,
      amount: amount
    });
  } catch (error) {
    console.error('Error processing USDC tip:', error);
    return Response.json({ error: 'Failed to process USDC tip' }, { status: 500 });
  }
}

// GET endpoint to retrieve tip configuration
export async function GET(_request: NextRequest) {
  try {
    // Return configuration for tipping functionality
    const tipConfig = {
      supportedTokens: ['USDC'],
      minAmount: 0.1,
      maxAmount: 100,
      recipientAddress: process.env.DEVELOPER_WALLET_ADDRESS || '0x1234567890123456789012345678901234567890', // Replace with actual wallet address
      chainId: 8453, // Base chain ID
      chainName: 'Base'
    };
    
    return Response.json(tipConfig);
  } catch (error) {
    console.error('Error fetching tip configuration:', error);
    return Response.json({ error: 'Failed to fetch tip configuration' }, { status: 500 });
  }
}