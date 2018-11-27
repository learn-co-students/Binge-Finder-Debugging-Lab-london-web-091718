import React from 'react'


export default class Adapter extends React.Component {
  static getShows (){
    return fetch("http://api.tvmaze.com/shows?page=0")
    .then(res => res.json())
  }

  static getShowEpisodes (showID){
    return fetch(`http://api.tvmaze.com/shows/${showID}/episodes`)
    .then(res => res.json())
  }

  static getMoreShows(digit) {
    return fetch(`http://api.tvmaze.com/shows?page=${digit}`)
      .then(res => res.json())
  }
}
