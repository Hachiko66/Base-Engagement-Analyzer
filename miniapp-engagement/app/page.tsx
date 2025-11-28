"use client";
import { useState, useEffect } from "react";
import { useQuickAuth, useMiniKit } from "@coinbase/onchainkit/minikit";
import { useRouter } from "next/navigation";
import { minikitConfig } from "../minikit.config";
import styles from "./page.module.css";

interface AuthResponse {
  success: boolean;
  user?: {
    fid: number; // FID is the unique identifier for the user
    issuedAt?: number;
    expiresAt?: number;
  };
  message?: string; // Error messages come as 'message' not 'error'
}

interface EngagementMetrics {
  neynarScore: number;
  posts7Days: number;
  posts30Days: number;
  posts90Days: number;
  likesReceived7Days: number;
  likesReceived30Days: number;
  likesReceived90Days: number;
  commentsReceived7Days: number;
  commentsReceived30Days: number;
  commentsReceived90Days: number;
  totalFollowers: number;
  totalFollowing: number;
  totalReplies: number;
  totalRecasts: number;
  totalLikesGiven: number;
}

export default function Home() {
  const { isFrameReady, setFrameReady, context } = useMiniKit();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [engagementData, setEngagementData] = useState<EngagementMetrics | null>(null);
  const [activePeriod, setActivePeriod] = useState<'7' | '30' | '90'>('7');
  const router = useRouter();

  // Initialize the miniapp
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const { data: authData, isLoading: isAuthLoading, error: authError } = useQuickAuth<AuthResponse>(
    "/api/auth",
    { method: "GET" }
  );

  // Function to fetch engagement metrics from API
  const fetchEngagementMetrics = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      // Get user's FID from auth context
      if (!authData?.user?.fid) {
        throw new Error("User FID not available");
      }
      
      // Call API to get engagement metrics
      const response = await fetch(`/api/engagement?fid=${authData.user.fid}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch engagement data: ${response.statusText}`);
      }
      
      const data: EngagementMetrics = await response.json();
      setEngagementData(data);
    } catch (err) {
      setError("Failed to fetch engagement metrics");
      console.error("Error fetching engagement metrics:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeAccount = () => {
    // Check authentication first
    if (isAuthLoading) {
      setError("Please wait while we verify your identity...");
      return;
    }

    if (authError || !authData?.success) {
      setError("Please authenticate to analyze your account");
      return;
    }

    fetchEngagementMetrics();
  };

  const handleTip = async () => {
    // In a real implementation, this would connect to USDC tipping functionality
    // For now, we'll simulate the tipping process or call our API endpoint
    try {
      // Get tip configuration
      const configResponse = await fetch('/api/tip');
      if (!configResponse.ok) {
        throw new Error('Failed to get tip configuration');
      }
      
      const config = await configResponse.json();
      const recipientAddress = config.recipientAddress;
      
      // For demo purposes, we'll use a fixed amount
      // In a real app, this would come from a user input or modal
      const amount = 1.0; // 1 USDC
      
      // Get user's FID from auth context
      if (!authData?.user?.fid) {
        throw new Error("User FID not available");
      }
      
      // Call API to process tip
      const tipResponse = await fetch('/api/tip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          recipientAddress,
          fid: authData.user.fid
        })
      });
      
      if (!tipResponse.ok) {
        throw new Error('Failed to process tip');
      }
      
      const result = await tipResponse.json();
      alert(`Tip successful! Transaction: ${result.transactionHash}`);
    } catch (error) {
      console.error('Error processing tip:', error);
      alert('Failed to process tip. Please try again later.');
    }
  };

  // Get metrics based on selected period
  const getPeriodMetrics = () => {
    if (!engagementData) return null;
    
    return {
      posts: activePeriod === '7' ? engagementData.posts7Days : 
             activePeriod === '30' ? engagementData.posts30Days : 
             engagementData.posts90Days,
      likes: activePeriod === '7' ? engagementData.likesReceived7Days : 
             activePeriod === '30' ? engagementData.likesReceived30Days : 
             engagementData.likesReceived90Days,
      comments: activePeriod === '7' ? engagementData.commentsReceived7Days : 
                activePeriod === '30' ? engagementData.commentsReceived30Days : 
                engagementData.commentsReceived90Days,
    };
  };

  const periodMetrics = getPeriodMetrics();

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} type="button">
        ✕
      </button>
      
      <div className={styles.content}>
        <div className={styles.engagementCard}>
          <h1 className={styles.title}>{minikitConfig.miniapp.name}</h1>
          <p className={styles.subtitle}>
            Hey {context?.user?.displayName || "there"}, analyze your Farcaster engagement metrics
          </p>

          {!engagementData ? (
            <div className={styles.analyzeSection}>
              <button 
                onClick={handleAnalyzeAccount} 
                className={styles.analyzeButton}
                disabled={isAuthLoading || isLoading}
              >
                {isAuthLoading || isLoading ? "Analyzing..." : "Analyze My Account"}
              </button>
              
              {error && <p className={styles.error}>{error}</p>}
            </div>
          ) : (
            <div className={styles.metricsSection}>
              <div className={styles.metricsHeader}>
                <h2>Engagement Metrics</h2>
                
                <div className={styles.periodSelector}>
                  <button 
                    className={activePeriod === '7' ? styles.activePeriod : ''}
                    onClick={() => setActivePeriod('7')}
                  >
                    7 Days
                  </button>
                  <button 
                    className={activePeriod === '30' ? styles.activePeriod : ''}
                    onClick={() => setActivePeriod('30')}
                  >
                    30 Days
                  </button>
                  <button 
                    className={activePeriod === '90' ? styles.activePeriod : ''}
                    onClick={() => setActivePeriod('90')}
                  >
                    90 Days
                  </button>
                </div>
              </div>

              <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                  <h3>Neynar Score</h3>
                  <p className={styles.metricValue}>{engagementData.neynarScore}</p>
                </div>
                
                <div className={styles.metricCard}>
                  <h3>Posts ({activePeriod}d)</h3>
                  <p className={styles.metricValue}>{periodMetrics?.posts}</p>
                </div>
                
                <div className={styles.metricCard}>
                  <h3>Likes Received ({activePeriod}d)</h3>
                  <p className={styles.metricValue}>{periodMetrics?.likes}</p>
                </div>
                
                <div className={styles.metricCard}>
                  <h3>Comments Received ({activePeriod}d)</h3>
                  <p className={styles.metricValue}>{periodMetrics?.comments}</p>
                </div>
                
                <div className={styles.metricCard}>
                  <h3>Followers</h3>
                  <p className={styles.metricValue}>{engagementData.totalFollowers}</p>
                </div>
                
                <div className={styles.metricCard}>
                  <h3>Following</h3>
                  <p className={styles.metricValue}>{engagementData.totalFollowing}</p>
                </div>
              </div>
              
              <div className={styles.tipSection}>
                <p>Like this app? Support the developer with a USDC tip!</p>
                <button onClick={handleTip} className={styles.tipButton}>
                  Tip USDC
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}