
import './App.css';
import Pagination from 'react-js-pagination';
import { useState, useEffect } from 'react'
import axios from 'axios'


function App() {
  const [currentpage, setcurrentpage] = useState(1);
  const [recordperpage, setrecordperpage] = useState(0);
  const [recordtotal, setrecordtotal] = useState(0)
  const [userdetails, setuserdetails] = useState([])
  const pagerange = 5;

  useEffect(() => {
    axios.get(`https://reqres.in/api/users?page=${currentpage}`).then((response) => {
      setrecordperpage(response.data.per_page);
      setrecordtotal(response.data.total);
      setuserdetails(response.data.data);
      


    })
  }, [currentpage])
  const handlePageChange = (pagenumber) => {
    setcurrentpage(pagenumber);
  }

  return (
    <div>
      <h1 className="text-center" style={{ color: 'white' }}>Users</h1>
      <div className="cards">
        {
         userdetails.map((obj) => {
            return (
              <div
                className="card ml-2 mr-2"
              >

                <div className="image">
                  <img style={{ width: "72%", height: "100px" }} src={obj.avatar} alt="" />
                </div>
                <hr></hr>
                <div className="content" style={{ padding: '5px' }}>
                  <h6 className="text-muted mb-0">Name :{obj.first_name + ' ' + obj.last_name}</h6>
                  <span style={{fontSize:'13px'}} className="text-muted">Email:{obj.email}</span>
                 
                </div>
                
              </div>
            )
          })
        }
      </div>
      
      <div className="customPagination">

        <Pagination
          itemClass="page-item" // add it for bootstrap 4
          linkClass="page-link" // add it for bootstrap 4
          activePage={currentpage}
          itemsCountPerPage={recordperpage}
          totalItemsCount={recordtotal}
          pageRangeDisplayed={pagerange}
          onChange={handlePageChange}
        />
      </div>

    </div>
  );
}

export default App;
