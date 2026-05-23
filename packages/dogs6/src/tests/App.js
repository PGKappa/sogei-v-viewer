import React from 'react';

import Tests from './Tests.jsx';

function App() {
  /*
   * pages: Main, MainV2, Secondary, Trifecta, Video, Result
  */
  return <Tests.pages.Secondary headerVersion="v2" footerVersion="v2" 
    retailMode={true}
  />;
  //<Tests.pages.Main headerVersion="v1" footerVersion="v1" retailMode={true}/>
  //return <Tests.pages.Result headerVersion="v2" footerVersion="v2"/>
  //<Tests.pages.<PAGE_NAME> headerVersion="v2" footerVersion="v2"/>
}

export default App;


