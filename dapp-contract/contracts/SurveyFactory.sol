// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./Survey.sol";

struct SurveySchema {
  string title;
  string description;
  uint256 targetNumber;
  Question[] questions;
}
event SurveyCreated(address);

contract SurveyFactory {
  uint256 min_pool_amouont;
  uint256 min_reward_amount;

  Survey[] surveys;
  // pool amount = 50eht
  //target respondents number = 100
  // reward amount = 50eth / 100 = 0.5eth
  constructor(uint256 _min_pool_amouont, uint256 _min_reward_amount) {
    min_pool_amouont = _min_pool_amouont; //survey 만들기 위해최소 예치 금약
    min_reward_amount = _min_reward_amount; // 설문 참여자에게 주는 최소 보상 금액
  }

  function createSurvey(SurveySchema calldata _survey) external payable {
    require(msg.value >= min_pool_amouont, "Insufficient pool amount");
    require(
      msg.value / _survey.targetNumber >= min_reward_amount,
      "Insufficient reward amount"
    );

    Survey survey = new Survey{value: msg.value}(
      _survey.title,
      _survey.description,
      _survey.targetNumber,
      _survey.questions
    );
    surveys.push(survey);
    emit SurveyCreated(address(survey));
  }
  function getSurveys() external view returns (Survey[] memory) {
    return surveys;
  }
}
