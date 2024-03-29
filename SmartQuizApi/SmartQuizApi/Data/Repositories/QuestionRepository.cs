﻿using Microsoft.EntityFrameworkCore;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;

namespace SmartQuizApi.Data.Repositories
{
    public class QuestionRepository : RepositoryBase<Question>, IQuestionRepository
    {
        public QuestionRepository(DbA95102SmartquizContext context) : base(context)
        {
        }

        public void CreateQuestion(Question question)
        {
            Create(question);
        }

        public Question? GetQuestionById(string id)
        {
            return GetByCondition(x => x.Id.Equals(id)).Include(x => x.Answers).FirstOrDefault();
        }

        public async Task<List<Question>> GetQuestionsByStudySetIdAsync(string id)
        {
            return await GetByCondition(x => x.StudySetId.Equals(id)).Include(x => x.Answers).ToListAsync();
        }

        public void DeleteQuestion(Question question)
        {
            Delete(question);
        }

        public int GetTotalQuestionByStudySetId(string studySetId)
        {
            return GetByCondition(x => x.StudySetId.Equals(studySetId)).Count();
        }

        public async Task<List<Question>> GetQuestionsByStudySetIdAsync(string id, int amount)
        {
            return await GetByCondition(x => x.StudySetId.Equals(id)).OrderBy(x => Guid.NewGuid())
                                                                    .Take(amount)
                                                                    .Include(x => x.Answers).ToListAsync();
        }
    }
}
