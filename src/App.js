import React, { useState, useEffect } from 'react';
import "rmwc/dist/styles";
import { TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarTitle, TopAppBarFixedAdjust } from '@rmwc/top-app-bar';
import { List, ListItem, ListItemGraphic, ListItemText, ListItemPrimaryText, ListItemSecondaryText, ListItemMeta } from '@rmwc/list';

function App() {

  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URI + '/pdfs').then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data);
      }
    )
  }, [])

  return (
    <>
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection>
            <TopAppBarTitle>Quick App for downloading PDFs from a COS Bucket</TopAppBarTitle>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
      <div>
      {(typeof backendData.pdfs === 'undefined') ? (
        <p>Loading.....</p>
      ) : (
        <List twoLine>
        
          { backendData.pdfs.map((pdf, i) => (
            <ListItem key={i} onClick={(e) => {
              e.preventDefault();
              window.location.href=process.env.REACT_APP_API_URI + "/pdfs/" + pdf.Key;
            }}>
              <ListItemGraphic icon="picture_as_pdf" />
              <ListItemText>
                <ListItemPrimaryText>{pdf.Key}</ListItemPrimaryText>
                <ListItemSecondaryText>{new Date(pdf.LastModified).toDateString()}</ListItemSecondaryText>
              </ListItemText>
              <ListItemMeta icon="cloud_download" />
            </ListItem>
          ))}
        </List>
      )}
    </div>
    </>
  );
}

export default App;
