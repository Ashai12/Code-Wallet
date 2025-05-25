import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs.css';

const StyledDialogTitleDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 16px;
  width: 100%;
  box-sizing: border-box;
`;

const StyledButtonTitle = styled.h4`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
`;

const StyledTitleSpan = styled.span`
  color: #9A48D0;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
`;

// ...imports et styles...

export default function FragmentDialog({ open, handleClose, title, id }) {
  const [text, setText] = useState(() => {
    if (id) {
      return localStorage.getItem(`fragment-${id}`) || '';
    }
    return '';
  }); // Ouvre une zone de texte selon l'id du fragment, sinon vide 
  
  const [highlightedHTML, setHighlightedHTML] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    if (open && id) {
      const savedText = localStorage.getItem(`fragment-${id}`) || '';
      setText(savedText);
    }
  }, [open, id]); // Recharge le texte à chaque ouverture du Dialog ou changement d'id

  useEffect(() => {
    if (id) {
      localStorage.setItem(`fragment-${id}`, text);
    }
  }, [text, id]); // Sauvegarde à chaque modification

  useEffect(() => {
    setHighlightedHTML(hljs.highlightAuto(text).value);
  }, [text]); // coloration syntaxique du texte

  const handleTextChange = (event) => setText(event.target.value); // met à jour l’état React pour que le texte change dans le composant

  const handleCopy = () => {
    if (!text.trim()) {
      setSnackbarMessage('The text is empty. Unable to copy.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarMessage('Texte copied');
      setSnackbarSeverity('info');
      setSnackbarOpen(true);
    }).catch((err) => {
      console.error('Erreur lors de la copie du texte :', err);
    });
  }; // Fonction pour copier le texte dans le presse-papiers

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <StyledDialogTitleDiv>
        <DialogTitle id="alert-dialog-title">
          <StyledTitleSpan>{title || "Fragment's title"}</StyledTitleSpan>
        </DialogTitle>
        <CloseIcon
          onClick={handleClose}
          fontSize="large"
          sx={{
            color: '#333333',
            fontSize: '32px',
            cursor: 'pointer',
            position: 'absolute',
            top: '50%',
            right: '16px',
            transform: 'translateY(-50%)',
          }}
        />
      </StyledDialogTitleDiv>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', height: 'auto' }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '150px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#f5f5f5',
            fontFamily: 'Courier New, monospace',
            fontSize: '14px',
            padding: '10px',
            overflow: 'hidden',
          }}
        >
          <pre
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: 0,
              padding: '10px',
              pointerEvents: 'none',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              color: '#333',
            }}
            dangerouslySetInnerHTML={{ __html: highlightedHTML }}
          />
          <TextareaAutosize
            value={text}
            onChange={handleTextChange}
            aria-label="Code editor"
            placeholder="Enter your code..."
            style={{
              width: '100%',
              height: '100%',
              minHeight: '470px',
              minWidth: '470px',
              background: 'transparent',
              color: 'transparent',
              caretColor: '#333',
              fontFamily: 'Courier New, monospace',
              fontSize: '14px',
              border: 'none',
              outline: 'none',
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          size="large"
          sx={{
            marginLeft: '400px',
            backgroundColor: '#7BC950',
            color: '#9A48D0',
            borderColor: '#333333',
          }}
          onClick={handleCopy}
        >
          <StyledButtonTitle>Copy</StyledButtonTitle>
        </Button>
      </DialogActions>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}