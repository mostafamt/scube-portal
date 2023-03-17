import React, { useEffect } from "react";
import useStore from "../Store/store";
import config from "../../config";
let currentSession;

export default function Courses() {
  const currentUser = config.UserPool.getCurrentUser();
  if (currentUser) {
    currentUser.getSession((err, session) => {
      currentSession = session;
    });
  }

  const tenant_id = config.TENANT_ID;
  const { setPageTitle } = useStore((state) => state);
  useEffect(() => {
    setPageTitle("Courses");
  }, []);

  return (
    <>
      {currentSession.isValid() && (
        <div>
          <iframe
            title="my-iframe"
            width="100%"
            height="1000px"
            src={`https://lom.eduedges.com/courses?id_token=${currentSession.idToken.jwtToken}&access_token=${currentSession.accessToken.jwtToken}&tenant_id=${tenant_id}`}
          ></iframe>
        </div>
      )}
    </>
  );
}
