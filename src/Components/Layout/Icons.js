import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faSpotify,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
const Icon = ()=>{
    return(
        <div className="mt-3 ">
        {/* YouTube Icon Link */}
        <a
          href="https://www.youtube.com/your-channel-url"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white me-3"
        >
          <FontAwesomeIcon icon={faYoutube} />
        </a>

        {/* Spotify Icon Link */}
        <a
          href="https://open.spotify.com/your-artist-url"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white me-3"
        >
          <FontAwesomeIcon icon={faSpotify} />
        </a>

        {/* Facebook Icon Link */}
        <a
          href="https://www.facebook.com/your-page-url"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
      </div>
    )
}

export default Icon;