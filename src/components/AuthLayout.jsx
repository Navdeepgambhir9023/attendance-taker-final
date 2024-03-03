import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Protected = ({children, authentication = true}) => {

  const authStatus = useSelector(state => state.auth.status);
  const navigate = useNavigate();
  const [loader, setLoader] = React.useState(true);

  useEffect(() => {
    if (authentication && !authStatus) {
      navigate('/login');
    } else if (!authentication && authStatus) {
      navigate('/dashboard');
    } else {
      setLoader(false);
    }
  }, [authStatus, authentication, navigate]);


  return loader ? <div>
    {/* create a good loader for this loading component */}
    
    
    </div> : <>{children}</>;

}

export default Protected