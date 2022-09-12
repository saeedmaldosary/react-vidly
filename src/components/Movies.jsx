import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Like from "./Like";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };
  render() {
    return (
      <div className="container p-2">
        <p>{this.displayTitle()}</p>
        <table className={this.state.movies.length > 0 ? "table" : "d-none"}>
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          {this.getMoviesList()}
        </table>
      </div>
    );
  }

  displayTitle = () => {
    var moviesLength = this.state.movies.length;
    return moviesLength > 0
      ? "Showing " + moviesLength + " movies in the database."
      : "There are no movies in the database.";
  };

  handleLike = (movie) => {
    var movies = this.state.movies;
    const index = this.state.movies.indexOf(movie);
    if (
      this.state.movies[index].liked == undefined ||
      this.state.movies[index].liked == false
    )
      this.state.movies[index].liked = true;
    else this.state.movies[index].liked = false;

    this.setState({ movies: movies });
  };

  getMoviesList() {
    return (
      <tbody>
        {this.state.movies.map((movie) => (
          <tr key={movie._id}>
            <th>{movie.title}</th>
            <th>{movie.genre.name}</th>
            <th>{movie.numberInStock}</th>
            <th>{movie.dailyRentalRate}</th>
            <th>
              <Like
                liked={movie.liked}
                onClick={() => this.handleLike(movie)}
              />
            </th>
            <th>
              <button
                onClick={() => this.deleteMovieList(movie._id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </th>
          </tr>
        ))}
      </tbody>
    );
  }

  deleteMovieList = (movieID) => {
    deleteMovie(movieID);
    this.setState({ movies: getMovies() });
  };
}

export default Movies;
