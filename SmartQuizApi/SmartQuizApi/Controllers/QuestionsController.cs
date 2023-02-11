﻿using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartQuizApi.Data.DTOs.QuestionDTOs;
using SmartQuizApi.Data.IRepositories;
using SmartQuizApi.Data.Models;
using SmartQuizApi.Services.Utils;

namespace SmartQuizApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public QuestionsController(IMapper mapper, IRepositoryManager repositoryManager)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        [HttpPut]
        public async Task<IActionResult> UpdateQuestion(UpdateQuestionDTO updateQuestionDTO)
        {
            try
            {
                var question = _repositoryManager.Question.GetQuestionById(updateQuestionDTO.Id);
                if (question == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response(400, "Question id does not exist"));
                }

                _repositoryManager.Question.DeleteQuestion(question);

                var newQuestion = _mapper.Map<Question>(updateQuestionDTO);
                _repositoryManager.Question.CreateQuestion(newQuestion);
                await _repositoryManager.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, new Response(200, "", "Update successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }
    }
}
