import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import api from "../api/axios";

const glassCard = {
  bgcolor: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(20px)",
  borderRadius: 4,
  border: "1px solid rgba(255,255,255,0.5)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
};

const PeerSupportPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState("");
  const [replyText, setReplyText] = useState({});
  const [submitting, setSubmitting] = useState(false);

  /* ================= FETCH POSTS ================= */
  const fetchPosts = async () => {
    try {
      const res = await api.get("/support");
      setPosts(res.data);
    } catch (error) {
      console.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  /* ================= ADD POST ================= */
  const handleAddPost = async () => {
    if (!newPost.trim()) return;

    setSubmitting(true);

    try {
      await api.post("/support/add", {
        message: newPost,
      });

      setNewPost("");
      fetchPosts();
    } catch (error) {
      console.error("Post failed");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= ADD REPLY ================= */
  const handleReply = async (postId) => {
    if (!replyText[postId]) return;

    try {
      await api.post(`/support/reply/${postId}`, {
        text: replyText[postId],
      });

      setReplyText({ ...replyText, [postId]: "" });
      fetchPosts();
    } catch (error) {
      console.error("Reply failed");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 6, background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)" }}>
      <Container maxWidth="md">

        <Typography variant="h4" sx={{ mb: 4 }}>
          💬 Peer Support Community
        </Typography>

        {/* CREATE POST */}
        <Card sx={{ ...glassCard, mb: 4 }}>
          <CardContent>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Share what's on your mind..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />

            <Button
              sx={{
                mt: 2,
                bgcolor: "#4a7c59",
                color: "white",
                textTransform: "none",
              }}
              onClick={handleAddPost}
              disabled={submitting}
            >
              {submitting ? <CircularProgress size={20} /> : "Post"}
            </Button>
          </CardContent>
        </Card>

        {/* POSTS */}
        {loading ? (
          <CircularProgress />
        ) : posts.length === 0 ? (
          <Typography>No posts yet.</Typography>
        ) : (
          posts.map((post) => (
            <Card key={post._id} sx={{ ...glassCard, mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  {post.userId?.name || "User"}
                </Typography>

                <Typography sx={{ mb: 2 }}>
                  {post.message}
                </Typography>

                {/* REPLIES */}
                {post.replies.map((reply, index) => (
                  <Box key={index} sx={{ mb: 1, pl: 2 }}>
                    <Typography variant="caption">
                      {reply.userId?.name || "User"}:
                    </Typography>
                    <Typography variant="body2">
                      {reply.text}
                    </Typography>
                  </Box>
                ))}

                {/* ADD REPLY */}
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Write a reply..."
                  value={replyText[post._id] || ""}
                  onChange={(e) =>
                    setReplyText({
                      ...replyText,
                      [post._id]: e.target.value,
                    })
                  }
                  sx={{ mt: 2 }}
                />

                <Button
                  size="small"
                  sx={{ mt: 1, color: "#4a7c59", textTransform: "none" }}
                  onClick={() => handleReply(post._id)}
                >
                  Reply
                </Button>
              </CardContent>
            </Card>
          ))
        )}

      </Container>
    </Box>
  );
};

export default PeerSupportPage;
