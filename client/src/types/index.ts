export interface Message {
  id: string;
  content: string;
  sender: string;
  created_at: string;
};

export interface Profile {
  id: string;
  username: string;
}

export interface PrivateChat {
  id: string;
  user1_id: string;
  user2_id: string;
};