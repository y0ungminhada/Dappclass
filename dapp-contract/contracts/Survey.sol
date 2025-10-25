// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

struct Question {
  string question;
  string[] options;
}
struct Answer {
  address respondent;
  uint8[] answers;
}

contract Survey {
  string public title;
  string public description;
  uint256 public targetNumber;
  uint256 public rewardAmount;
  Question[] questions;
  Answer[] answers;

  // primitive: int, bool, uint, address
  // memory, storage, calldata
  constructor(
    string memory _title,
    string memory _description,
    uint256 _targetNumber,
    Question[] memory _questions
  ) payable {
    title = _title;
    description = _description;
    targetNumber = _targetNumber;
    rewardAmount = msg.value / _targetNumber;
    for (uint i = 0; i < _questions.length; i++) {
      //version 1
      questions.push(
        Question({
          question: _questions[i].question,
          options: _questions[i].options
        })
      );

      //version 2
      // Question storage q = questions.push();
      // q.question = _questions[i].question;
      // q.options = _questions[i].options;
    }
  }

  function submitAnswer(Answer calldata _answer) external {
    //length validation
    require(
      _answer.answers.length == questions.length,
      "Mismatched answers length"
    );
    require(answers.length < targetNumber, "This survey has been ended"); // <=이면 오류 테스트를 할 수 없어서 <로 수정
    // <=이면 목표치에 도달한 제출도 통과해서 보상 전송으로 잔고가 0이 되어서 다른 오류가 나옴
    answers.push(
      Answer({respondent: _answer.respondent, answers: _answer.answers})
    );
    payable(msg.sender).transfer(rewardAmount);
  }

  function getAnswers() external view returns (Answer[] memory) {
    return answers;
  }

  function getQuestions() external view returns (Question[] memory) {
    return questions;
  }
}
