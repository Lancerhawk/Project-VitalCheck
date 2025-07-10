import './Notifications.css';
import { useState } from 'react';
import { notifications, getNotificationColor } from '../data/NotificationData';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Paper,
  Button,
  Box,
  Typography
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

function Notifications() {
  const [notificationsList, setNotificationsList] = useState(notifications);

  const handleDismiss = (id) => {
    setNotificationsList(notificationsList.filter(notification => notification.id !== id));
  };

  const handleMarkAllRead = () => {
    setNotificationsList(notificationsList.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const unreadCount = notificationsList.filter(notification => !notification.read).length;

  return (
    <div className='notifications'>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" className='heading-noti'>
          <h2>Notifications ({notificationsList.length})</h2>
        </Typography>
        {unreadCount > 0 && (
          <Button onClick={handleMarkAllRead} variant="outlined">
            Mark All Read
          </Button>
        )}
      </Box>

      <Paper elevation={0} sx={{ bgcolor: 'background.paper' }}>
        <List sx={{ width: '100%' }}>
          {notificationsList.map((notification) => (
            <ListItem
              key={notification.id}
              alignItems="flex-start"
              sx={{
                borderBottom: '1px solid #E2E8F0',
                bgcolor: notification.read ? 'transparent' : '#EBF8FF',
                '&:last-child': { borderBottom: 'none' }
              }}
              secondaryAction={
                <IconButton edge="end" onClick={() => handleDismiss(notification.id)}>
                  <CloseIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: getNotificationColor(notification.type) }}>
                  {<notification.icon />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={notification.message}
                secondary={notification.time}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontWeight: notification.read ? 400 : 600,
                    color: '#2D3748'
                  },
                  '& .MuiListItemText-secondary': {
                    color: '#718096'
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
}

export default Notifications;