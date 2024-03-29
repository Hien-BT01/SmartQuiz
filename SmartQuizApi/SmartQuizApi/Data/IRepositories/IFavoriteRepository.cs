﻿using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.IRepositories
{
    public interface IFavoriteRepository
    {
        void CreateFavorite(Favorite favorite);
        void DeleteFavorite(ICollection<Favorite> favorites);
    }
}
