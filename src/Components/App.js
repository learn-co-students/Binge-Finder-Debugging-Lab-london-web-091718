import React, { Component } from 'react';
import Adapter from '../Adapter';
import TVShowList from './TVShowList';
import Nav from './Nav';
import SelectedShowContainer from './SelectedShowContainer';
import { Grid } from 'semantic-ui-react';
import MoreButton from './MoreButton'


class App extends Component {
  state = {
    shows: [],
    searchTerm: "",
    selectedShow: "",
    episodes: [],
    filterByRating: 0,
    currentPage: 0
  }

  componentDidMount = () => {
    Adapter.getShows().then(shows =>
      this.setState({ shows: shows}))
  }

  componentDidUpdate = () => {
    
    window.scrollTo(0, 0)
  }

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value.toLowerCase() })
  }

  handleFilter = (e) => {
    e.target.value === "No Filter" ? this.setState({ filterByRating: 0 }) : this.setState({ filterByRating: e.target.value})
  }

  selectShow = show => {
    Adapter.getShowEpisodes(show.id)
    .then((episodes) => this.setState({
      selectedShow: show,
      episodes: episodes
    }))
  }

  displayShows = () => {
    if (this.state.filterByRating > 0){
      return this.state.shows.filter((s)=> {
        console.log('filtering')
        return s.rating.average >= this.state.filterByRating
      })
    } else {
      console.log('not filtering')
      return this.state.shows
    }
  }

  handleMore = () =>{
   
    Adapter.getMoreShows(this.state.currentPage+1).then(fetchedShows =>
      {
      let loadedShowsBefore = JSON.stringify(this.state.shows)
      let loadedShows = JSON.parse(loadedShowsBefore)
      let newAllShows = loadedShows.concat(fetchedShows)
      this.setState({ shows: newAllShows })
      this.setState({ currentPage: this.state.currentPage+1 })
      })
  }


  render (){
    return (
      <div>
        <Nav handleFilter={this.handleFilter}  handleSearch={this.handleSearch} searchTerm={this.state.searchTerm}/>
        <Grid celled>
          <Grid.Column width={5}>
            {
              !!this.state.selectedShow ? 
            <SelectedShowContainer 
                className="showpage"
                selectedShow={this.state.selectedShow} 
                episodes={this.state.episodes}
                /> : 
                <div />
                }
          </Grid.Column>
          <Grid.Column width={11}>
            <TVShowList
                shows={this.displayShows()}
                selectShow={this.selectShow}
                searchTerm={this.state.searchTerm}
                handleMore={ this.handleMore }
                />
          </Grid.Column >
          
        </Grid>
                
      </div>

    );
  }
}

export default App;
