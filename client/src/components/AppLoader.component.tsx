
import { Spinner } from 'react-bootstrap';

const AppLoader = () => {
  return (
    <div className="w-100 d-flex justify-content-center flex-column gap-12 align-items-center" style={{height: '80vh'}}>

        {/* <h2 className="mb-5">Authenticating...</h2>  */}

        <Spinner 
          animation="border"
          variant="primary"
        />
      </div>
  )
}

export default AppLoader;