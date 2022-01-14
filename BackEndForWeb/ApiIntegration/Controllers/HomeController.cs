using Microsoft.AspNetCore.Mvc;
using Movie.Core.Entities;
using Movie.Core.Interfaces;
using Movie.Core.Resources.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Movie.ApiIntegration.Controllers
{
    [ApiController]
    [Route("api/v1/dashboard")]
    public class HomeController : ControllerBase
    {
        private IUnitOfWork _unitOfWork;
        public HomeController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [HttpGet]
        public async Task<IActionResult> Dashboard()
        {
            var movies = Movies();
            var casts = Casts();
            var companies = Companies();
            var genres = Genres();
            Task.WaitAll(movies, casts, companies, genres);

            return Ok(ResponseBase.Success(new DashboardResponse
            {
                Movies = movies.GetAwaiter().GetResult().Count,
                Casts = casts.GetAwaiter().GetResult().Count,
                Companies = companies.GetAwaiter().GetResult().Count,
                Genres = genres.GetAwaiter().GetResult().Count
            }));
        }
        private async Task<List<MovieModel>> Movies() 
            => (List<MovieModel>)await _unitOfWork.Movie.GetMovieAsync();
        private async Task<List<Cast>> Casts()
            => (List<Cast>)await _unitOfWork.Cast.GetCastAsync();
        private async Task<List<Company>> Companies()
            => (List<Company>)await _unitOfWork.Company.GetCompanyAsync();
        private async Task<List<Genre>> Genres()
            => (List<Genre>)await _unitOfWork.Genre.GetGenresAsync();
    }
}
