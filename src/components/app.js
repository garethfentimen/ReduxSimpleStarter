import React, { Component } from 'react';
import YtSearch from 'youtube-api-search';
import VideoList from './video-list';
import _ from 'lodash';
import VideoDetail from './video-detail';
import SearchBar from './search-bar';
const apiKey  = 'AIzaSyB-n0sx1CmL--DEXBT340GdIqLDwc-Om7w';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      videos: [], 
      selectedVideo: null 
    };

    this.videoSearch('surfboards');
  }

  videoSearch(term) {
    YtSearch({ key: apiKey, term}, (videos) => {
      this.setState({ videos, selectedVideo: videos[0] });
    });
  }

  render() {
    const videoSearch = _.debounce(term => {
      this.videoSearch(term);
    }, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})} 
          videos={this.state.videos} />
      </div>
    );
  }
}
