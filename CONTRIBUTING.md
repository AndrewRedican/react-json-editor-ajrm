# Introduction

### First off, thank you for considering contributing to react-json-editor-ajrm. It's people like you that make it such a great repository.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.


RJEA is an open source project and we love to receive contributions from our community — you! There are many ways to contribute, from writing tutorials or blog posts, improving the documentation, submitting bug reports and feature requests or writing code which can be incorporated into RJEA itself.

### About Inquiries

Until our slack channel is set up, feel free to use the [issue tracker](https://github.com/AndrewRedican/react-json-editor-ajrm/issues) for support questions.

# Your First Contribution
Unsure where to begin contributing to RJEA? You can start by looking through these beginner and help-wanted issues:

* [Beginner issues](https://github.com/AndrewRedican/react-json-editor-ajrm/labels/beginner) - issues which should only require a few lines of code, and a test or two.
* [Help wanted issues](https://github.com/AndrewRedican/react-json-editor-ajrm/labels/help%20wanted) - issues which should be a bit more involved than beginner issues.

Both issue lists are sorted by total number of comments. While not perfect, number of comments is a reasonable proxy for impact a given change will have.

### Working on your first Pull Request?

You can learn how from this *free* series, [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github).

At this point, you're ready to make your changes! Feel free to ask for help; everyone is a beginner at first :smile_cat:

FYI - If a maintainer asks you to "rebase" your PR, they're saying that a lot of code has changed, and that you need to update your branch so it's easier to merge.

# Getting started

As a rule of thumb, changes are obvious fixes if they do not introduce any new functionality or creative thinking. As long as the change does not affect functionality, some likely examples include the following:
* Spelling / grammar fixes
* Typo correction, white space and formatting changes
* Comment clean up
* Bug fixes that change default return values or error codes stored in constants
* Adding logging messages or debugging output
* Changes to ‘metadata’ files like Gemfile, .gitignore, build scripts, etc.
* Moving source files from one directory or package to another

# How to report a bug
If you find a security vulnerability, do NOT open an issue. Email andrew.redican.mejia@gmail.com instead.
In order to determine whether you are dealing with a security issue, ask yourself these two questions:

* Can I access something that's not mine, or something I shouldn't have access to?
* Can I disable something for other people?

If you don’t want to use your personal contact information, set up a “security@” email address. Larger projects might have more formal processes for disclosing security, including encrypted communication. (Disclosure: I am not a security expert.)
If the answer to either of those two questions are "yes", then you're probably dealing with a security issue. Note that even if you answer "no" to both questions, you may still be dealing with a security issue, so if you're unsure, just email us at andrew.redican.mejia@gmail.com.

### When filling an issue, make sure to answer these five questions:

1. What version of node are you using (node version)? * REQUIRED
2. What operating system and processor architecture are you using? * REQUIRED
3. What did you do? * REQUIRED
4. What did you expect to see? * REQUIRED
5. What did you see instead? * REQUIRED

#### Complete Issue Policy: All questions must be answered when submitting an issue.
> Please make sure to provide as much detail as possible, including reproduction steps, and/or error logs. This will ensure that we get all the information we can to better solve your inquiry in the shortest amount of time. Any issues that do not meet this criteria will be closed automatically.

### Timely Confirmation Policy: All answered inquiries must be confirmed in a timely manner.
> Please make sure to provide confirmation to any answers / solutions provided to an issue or inquiry in a timely manner. We expect a confirmation within 48 hours time. A thumbs up reaction will do. We volunteer our time to review inquiries to the best of our abbility in a timely manner. We expect the same kind of courtesy from those that approach us with inquiries but most importantly this is done to prevent resolved issues to remain open and stack. Any issues we consider to be resolved but lack confirmation will be closed automatically.

# How to suggest a feature or enhancement
If you find yourself wishing for a feature that doesn't exist in RJEA, you are probably not alone. There are bound to be others out there with similar needs. The proper way to do it is to open up a new issue [here](https://github.com/AndrewRedican/react-json-editor-ajrm/issues). Please make sure to check the list of existing feature requests to avoid duplication.

# Code review process
This is the checklist that I try to go through for every single pull request that I get. If you're wondering why it takes so long for me to accept pull requests, this is why.

- [ ] **General**

  - [ ] Is this change useful to me, or something that I think will benefit others greatly?
  - [ ] Check for overlap with other PRs.
  - [ ] Think carefully about the long-term implications of the change. How will it affect existing projects that are dependent on this? How will it affect my projects? If this is complicated, do I really want to maintain it forever? Is there any way it could be implemented as a separate package, for better modularity and flexibility?

- [ ] **Check the Code**

  - [ ] If it does too much, ask for it to be broken up into smaller PRs.
  - [ ] Is it consistent?
  - [ ] Review the changes carefully, line by line. Make sure you understand every single part of every line. Learn whatever you do not know yet.
  - [ ] Take the time to get things right. PRs almost always require additional improvements to meet the bar for quality. Be very strict about quality. This usually takes several commits on top of the original PR.

- [ ] **Check the Tests**

  - [ ] Does it have tests? If not:

    - [ ] Comment on the PR "Can you please add tests for this code to `foo_bar.js`", or...
    - [ ] Write the tests yourself.

- [ ] Do the tests pass for all of the following? If not, write a note in the PR, or fix them yourself. [**Read about testing**](https://github.com/AndrewRedican/react-json-editor-ajrm/wiki/How-to-Create-and-Run-Tests)

    - [ ] *Outlines have not been defined yet.*

- [ ] **Check the Doc**

- [ ] Does it have docs? If not:

  - [ ] Comment on the PR "Can you please add docs for this feature to `docs/usage.rst`", or...
  - [ ] Write the docs yourself.

- [ ] If any new functions/classes are added, do they contain docstrings?
- [ ] If any new features are added, are they in `README.rst`?

- [ ] **Credit the Authors**

  - [ ] Add name and URL to `AUTHORS.rst`.
  - [ ] Copy and paste title and PR number into `HISTORY.rst`.
  - [ ] Thank them for their hard work.

- [ ] **Close Issues**

  - [ ] Merge the PR branch. This will close the PR's issue.
  - [ ] Close any duplicate or related issues that can now be closed. Write thoughtful comments explaining how the issues were resolved.

- [ ] **Release**

  - [ ] Decide whether the changes in master make sense as a major, minor, or patch release.
  - [ ] Look at the clock. If you're tired, release later when you have time to deal with release problems.
  - [ ] Then follow all the steps in [post-release guidelines]().
  
# Community
1. Github
2. Twitter
3. Slack
