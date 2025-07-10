import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { notifications, getNotificationColor } from '../../../data/NotificationData';

function NotificationsCard() {
    const navigate = useNavigate();
    const recentNotifications = notifications.slice(0, 5);

    return (
        <div className="dashboard-card notifications-card">
            <h2>
                <NotificationsIcon sx={{ mr: 1, verticalAlign: 'bottom' }} />
                Recent Notifications
            </h2>
            <Paper sx={{ maxHeight: 400, overflow: 'auto', marginBottom: 2 }}>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {recentNotifications.map((notification) => (
                        <ListItem key={notification.id} alignItems="flex-start">
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
                                        fontWeight: 500,
                                        color: '#2d3748'
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
            <Button 
                variant="contained" 
                color="primary"
                onClick={() => navigate('/dashboard/notifications')}
                fullWidth
                startIcon={<NotificationsIcon />}
            >
                View All Notifications
            </Button>
        </div>
    );
}

export default NotificationsCard;