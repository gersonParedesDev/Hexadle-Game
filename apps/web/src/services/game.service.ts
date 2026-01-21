const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface StartGameResponse {
  id: string;
  message: string;
  length: number;
  target: string;
}

export interface GuessResponse {
  feedback: string[];
}

export interface GameInitData {
  id: string;
  length: number;
  target: string;
}

export const gameService = {

  async startGame(): Promise<GameInitData> {
    const res = await fetch(`${API_URL}/games`, {
      method: 'POST',
    });
    
    if (!res.ok) {
        throw new Error('Error starting the game on the server');
    }
    
    const data: StartGameResponse = await res.json();

    return {
      id: data.id,
      length: data.length,
      target: data.target
    }; 
  },

  async submitGuess(gameId: string, guess: string) {
    const res = await fetch(`${API_URL}/games/${gameId}/attempts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guess }),
    });

    const data = await res.json();

    if (!res.ok) {
        throw { 
            message: data.message || 'Error submitting attempt', 
            status: res.status,
            solution: data.solution
        };
    }
    return data; 
  }
};