import React from "react";
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from "@material-ui/styles";
import IconButton from '@material-ui/core/IconButton';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ApartmentIcon from '@material-ui/icons/Apartment'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import Link from '@material-ui/core/Link'

const HoverCard = ({type, data}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const useStyles = makeStyles(theme => ({
    wrapper: {
        padding: '24px',
    },
    floatRight: {
        float: 'right'
    },
    padding5: {
        padding: '5px !important'
    },
    badge: {
        top: 0,
        right: 0,
        transform: 'scale(1) translate(10%, -50%)',
        transformOrigin: '100% 0%',
        height: '20px',
        display: 'flex',
        padding: '0 6px',
        zIndex: '1',
        position: 'absolute',
        flexWrap: 'wrap',
        fontSize: '0.75rem',
        minWidth: '20px',
        boxSizing: 'border-box',
        transition: 'transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        alignItems: 'center',
        fontWeight: '500',
        lineHeight: '1',
        alignContent: 'center',
        borderRadius: '10px',
        color: '#fff',
        justifyContent: 'center',
        backgroundColor: 'rgb(220, 0, 78)',
    }
}))
    const classes = useStyles();
    let body, button


  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function getColor(a, b) {
    return `${(Math.abs(a-b)/26)*255}, ${255-(Math.abs(a-b)/26)*255}, ${255-(Math.abs(a-b)/26)*255}`
  }

  if (type === 'attachments') {
    button = (
        !!data.data.attachments.length&&<IconButton
            className={`${classes.padding5} ${classes.floatRight}`}
            onMouseOver={handleClick}
        >
            <AttachFileIcon fontSize="large" color="action" />
            <span className={classes.badge}>{data.data.attachments.length}</span>
        </IconButton>
    )
    body = <div className={classes.wrapper}>
        {data.data.attachments.map((attachment, idx) => {
            const imageURL = `https://ecotrak-documents-production.s3.us-east-2.amazonaws.com/img/uploads/${attachment.documentType}s/${attachment.fileName}`
            return (<Link href={imageURL} color="inherit">{attachment.fileName}</Link>)
        })}
    </div>
} else {
    let author = data.user
    button = <IconButton aria-label="Author" onMouseOver={handleClick}>
            <PersonIcon color="secondary" />
        </IconButton>
    body = <div className={`${classes.wrapper} user-card`}>
        <div className="user-card-avatar" style={{background: `rgba(${getColor(author.firstName.split('').shift().toUpperCase().charCodeAt(), author.lastName.split('').shift().toUpperCase().charCodeAt())})`}}><span>{author.firstName.split('').shift().toUpperCase()+author.lastName.split('').shift().toUpperCase()}</span></div>
        <div className="user-card-info">
            <div className="main-info">
                <Typography variant='h6'>{`${author.firstName} ${author.lastName}`}</Typography>
                <Typography variant='body2'>{`${!!author.jobTitle?author.jobTitle:'Employee'}`}</Typography>
            </div>
            <div className="aux-info">
                <Typography variant='body6' style={{color: 'grey'}}><MailOutlineIcon />{`${author.email}`}</Typography>
                <Typography variant='body6' style={{color: 'grey'}}><ApartmentIcon />{`${author.companyName}`}</Typography>
            </div>
        </div>
    </div>
}

  return (
    <div>
        {button}
        <Menu
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "bottom", horizontal: "right" }}
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{ onMouseLeave: handleClose }}
            getContentAnchorEl={null}
        >
            {body}
        </Menu>
    </div>
  );
}

export default HoverCard;



// const HoverCard = ({ type, data }) => {
//     const classes = useStyles();
//     const [open, setOpen] = useState(false)
//     const handleOpen = (e) => {
//         setOpen(true)
//     }
//     const handleClose = (e) => {
//         setOpen(false)
//     }
//     let button
//     let body
//     if (type === 'attachments') {
//         button = (
//             <IconButton
//                 className={classes.padding5}
//             >
//                 <AttachFileIcon fontSize="large" color="action" />
//                 <span className={classes.badge}>{data.data.attachments.length}</span>
//             </IconButton>
//         )
//         body = <div className={classes.attachments}>
//             {data.data.attachments.map((attachment, idx) => {
//                 const imageURL = `https://ecotrak-documents-production.s3.us-east-2.amazonaws.com/img/uploads/${attachment.documentType}s/${attachment.fileName}`
//                 return (<Link href={imageURL} color="inherit">{attachment.fileName}</Link>)
//             })}
//         </div>
//     } else {
//         let author = data.user
//         button = <Tooltip title={`${author.firstName} ${author.lastName}/${author.companyName}`}>
//             <IconButton aria-label="Author">
//                 <PersonIcon color="secondary" />
//             </IconButton>
//         </Tooltip>
//     }
//     return (
//         <div className={classes.wrapper + ' ' + classes.floatRight} onMouseLeave={handleClose} onMouseOver={handleOpen}>
//             {button}
//             {body}
//         </div>
//     )
// }

// export default HoverCard