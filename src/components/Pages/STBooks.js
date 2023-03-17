import React, { useEffect } from "react";
import config from "../../config";
import Login from "../Auth/Login";
import useStore from "../Store/store";

let currentSession;

export default function LOM() {
  const currentUser = config.UserPool.getCurrentUser();
  if (currentUser) {
    currentUser.getSession((err, session) => {
      currentSession = session;
    });
  }

  const tenant_id = config.TENANT_ID;
  const { setPageTitle } = useStore((state) => state);
  useEffect(() => {
    setPageTitle("Book Reading");
  }, []);
  return (
    <>
      {currentSession.isValid() && (
        <div>
          <iframe
            title="my-iframe"
            width="100%"
            height="1000px"
            src={`https://lom.eduedges.com/st_books?id_token=${currentSession.idToken.jwtToken}&access_token=${currentSession.accessToken.jwtToken}&tenant_id=${tenant_id}`}
          ></iframe>
        </div>
      )}
    </>
  );
}
