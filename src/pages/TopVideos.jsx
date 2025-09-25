import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseURl } from '../Api/url'

function TopVideos() {

    const [topVideo, setTopVideo] = useState([])

    useEffect(()=>{
       axios
        .get(`${baseURl}api/admin/analytics/top-videos`) 
        .then((res)=>{
            // Removed alert to avoid annoying pop-ups
            setTopVideo(res.data.data)
            console.log(res.data)
        })
        .catch((err)=>{
            console.error(err)
        })
    },[])

  return (
    <div className="container">
        <div className='' style={{margin: "-8px  -35px"}}>
            <h5
              className="mb-4 fw-bold text-center"
              style={{
                width: "100%",
                position: "relative",
                padding: "8px 0",
                fontSize: "1.1rem",
                boxShadow: "0px 4px 6px -3px rgba(0,0,0,0.4), 0px -4px 6px -3px rgba(0,0,0,0.4)"
              }}
            >
              🔥 Top Videos
            </h5>
        </div>

        <div className="row">
          {topVideo.map((ele) => (
            <div className="col-md-4 mb-3" key={ele._id}>
              <div className="card shadow-sm border-0 h-100 rounded-2 overflow-hidden">
                {/* Thumbnail */}
                <img
                  src={ele.thumbnail}
                  alt={ele.title}
                  className="card-img-top"
                  style={{
                    height: "150px", // reduced from 200px
                    objectFit: "cover",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                />

                {/* Card Body */}
                <div className="card-body p-2"> {/* reduced padding */}
                  <h6 className="card-title fw-bold mb-2" style={{fontSize: "0.95rem"}}>{ele.title}</h6>
                  <div style={{fontSize: "0.85rem"}}> {/* smaller text */}
                    <p className="mb-1">
                      <i className="bi bi-eye-fill text-primary"></i>{" "}
                      <strong>{ele.totalViews}</strong> Views
                    </p>
                    <p className="mb-1">
                      <i className="bi bi-clock-history text-warning"></i>{" "}
                      Avg Watched: <strong>{ele.avgWatched} sec</strong>
                    </p>
                    <p className="mb-0">
                      <i className="bi bi-graph-up text-success"></i>{" "}
                      Completion: <strong>{ele.completionRate}%</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {topVideo.length === 0 && (
            <p className="text-muted text-center">No top videos available</p>
          )}
        </div>
    </div>
  );
}

export default TopVideos
