﻿using System;
using System.Collections.Generic;

namespace SmartQuizApi.Data.Models;

public partial class School
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<StudySet> StudySets { get; } = new List<StudySet>();
}