const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface WhatsAppMessage {
  id: string;
  wa_id: string;
  sender_phone: string;
  sender_name: string;
  content: string;
  timestamp: string;
  status: 'NEW' | 'REVIEWED' | 'APPROVED' | 'REJECTED';
  media_url?: string | null;
  mime_type?: string | null;
  created_at?: string;
  updated_at?: string;
}

export async function fetchMessages(): Promise<WhatsAppMessage[]> {
  try {
    const response = await fetch(`${API_URL}/api/messages`);
    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
}

export async function fetchMessageById(id: string): Promise<WhatsAppMessage | null> {
  try {
    const response = await fetch(`${API_URL}/api/messages/${id}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch message');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching message:', error);
    return null;
  }
}

export async function updateMessageStatus(
  id: string,
  status: 'NEW' | 'REVIEWED' | 'APPROVED' | 'REJECTED'
): Promise<WhatsAppMessage | null> {
  try {
    const response = await fetch(`${API_URL}/api/messages/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error('Failed to update message status');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating message status:', error);
    return null;
  }
}

