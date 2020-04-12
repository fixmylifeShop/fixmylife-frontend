import * as React from 'react';
import withInstagramFeed from './index';
import compose from 'recompose/compose';
 
 
const InstaGrid = ({ media, account, status}) => {
  return (
    <div style={{maxWidth:"1200px", display:"flex", flexWrap:"wrap", margin: "auto", justifyContent:"center"}}>
      {media &&
        status === 'completed' &&
        media.map(({ displayImage, id, postLink, accessibilityCaption }) => (
        <div style={{width:"300px", height:"300px", margin:"5px"}}>
            <a
              href={postLink || `https://www.instagram.com/explore/tags/${account}/`}
            >
              <img
                src={displayImage}
                alt={accessibilityCaption || 'Instagram picture'}
                style={{height: "300px", width: "100%", objectFit: "cover"}}
              />
         </a>
        </div>
        ))}
      {status === 'loading' &&         <p
          class="fa fa-instagram iconLinks"
        ><p style={{display:"none"}}>instagram</p></p>}
      {status === 'failed' && <p>Check instagram here</p>}
    {/* </Grid> */}
    </div>
  );
};
 
InstaGrid.defaultProps = {
  media: undefined,
};
 
export default compose(
  withInstagramFeed,
)(InstaGrid);