import {
  NOT_IN_THOUSANDS,
  DUPLICATE_EXPECT_NUMBER,
} from "../../src/constants/message.js";

const getPurchaseAmountInput = () =>
  cy.get("[data-cy='purchase-amount-input']");
const getPurchaseButton = () => cy.get("[data-cy='purchase-button']");

const getPurchaseResultSection = () =>
  cy.get("[data-cy='purchase-result-section']");
const getShowNumbersToggle = () => cy.get("[data-cy='show-numbers-toggle']");
const getLottoTicket = () => cy.get("[data-cy='lotto-ticket']");

const getExpectWinningResultSection = () =>
  cy.get("[data-cy='expect-winning-result-section']");
const getWinningNumberInput = () => cy.get("[data-cy='winning-number-input']");
const getBonusNumberInput = () => cy.get("[data-cy='bonus-number-input']");
const getOpenWinningResultButton = () =>
  cy.get("[data-cy='open-winning-result-button']");

const getWinningResultModal = () => cy.get("[data-cy='winning-result-modal']");
const getWinningResultModalCloseButton = () =>
  cy.get("[data-cy='winning-result-modal-close-button']");
const getResetButton = () => cy.get("[data-cy='reset-button']");

describe("로또 어플리케이션을 테스트한다.", () => {
  context("구입 금액 input을 테스트한다.", () => {
    beforeEach(() => {
      cy.visit("../../index.html");
    });

    it("구입 금액 input이 있다.", () => {
      getPurchaseAmountInput().should("exist");
    });

    it("구입 금액을 입력하면 화면에 입력한 금액이 그대로 보여진다.", () => {
      getPurchaseAmountInput().type("1000");
      getPurchaseAmountInput().should("have.value", "1000");
    });

    it("구입 금액은 숫자만 입력할 수 있다.", () => {
      getPurchaseAmountInput().type("가나다abc!@#");
      getPurchaseAmountInput().should("have.value", "");
    });
  });

  context("로또 발급을 위한 확인 버튼을 테스트한다.", () => {
    beforeEach(() => {
      cy.visit("../../index.html");
    });

    it("확인 버튼이 있다.", () => {
      getPurchaseButton().should("exist");
    });

    it("금액을 1,000원 단위로 입력하지 않고 확인 버튼을 클릭하면 alert를 띄워준다.", () => {
      const stub = cy.stub();
      cy.on("window:alert", stub);
      getPurchaseAmountInput().type("1010");
      getPurchaseButton()
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(NOT_IN_THOUSANDS);
        });
    });

    it("확인 버튼을 클릭했을 때, 입력한 금액에 맞는 로또 개수가 발급된다.", () => {
      getPurchaseAmountInput().type("3000");
      getPurchaseButton().click();
      getLottoTicket().should("have.length", 3);
    });
  });

  context("번호보기 토글을 테스트한다.", () => {
    beforeEach(() => {
      cy.visit("../../index.html");
      getPurchaseAmountInput().type("3000");
      getPurchaseButton().click();
      getShowNumbersToggle().click();
    });

    it("번호보기 토글이 있다.", () => {
      getShowNumbersToggle().should("exist");
    });

    it("번호보기 토글을 클릭하면 로또 번호를 볼 수 있다.", () => {
      getLottoTicket().find(".ticket-detail").should("be.visible");
    });

    it("로또 번호의 숫자는 총 6개이다.", () => {
      getLottoTicket()
        .find(".ticket-detail")
        .each(($detail) => {
          const splitted = $detail.text().split(", ");
          assert.equal(splitted.length, "6");
        });
    });

    it("로또 번호의 범위는 1부터 45까지다.", () => {
      getLottoTicket()
        .find(".ticket-detail")
        .each(($detail) => {
          const splitted = $detail.text().split(", ");
          for (let i = 0; i < splitted.length; i++) {
            if (splitted[i] < 1 || splitted[i] > 45) {
              throw Error("로또 번호의 범위를 벗어납니다.");
            }
          }
        });
    });

    it("번호보기 토글을 비활성화하면 번호는 가려진다.", () => {
      getShowNumbersToggle().click();
      getLottoTicket().find(".ticket-detail").should("not.be.visible");
    });
  });

  context("당첨 번호와 보너스 번호를 입력하는 input을 테스트한다.", () => {
    beforeEach(() => {
      cy.visit("../../index.html");
      getPurchaseAmountInput().type("3000");
      getPurchaseButton().click();
    });

    it("당첨 번호 input이 6개, 보너스 번호 input이 1개 있다.", () => {
      getWinningNumberInput().should("have.length", 6);
      getBonusNumberInput().should("have.length", 1);
    });

    it("당첨 번호 input과 보너스 번호 input에는 숫자만 입력할 수 있다.", () => {
      getWinningNumberInput().each(($input) => {
        cy.wrap($input).type("가나다abc!@#");
        cy.wrap($input).should("have.value", "");
      });
      getBonusNumberInput().type("가나다abc!@#");
      getBonusNumberInput().should("have.value", "");
    });
  });

  context("결과 확인하기 버튼을 테스트한다.", () => {
    beforeEach(() => {
      cy.visit("../../index.html");
      getPurchaseAmountInput().type("3000");
      getPurchaseButton().click();
    });

    it("결과 확인하기 버튼이 있다.", () => {
      getOpenWinningResultButton().should("exist");
    });

    it("결과 확인하기 버튼을 눌렀을 때 당첨 번호와 보너스 번호 input에 중복된 숫자가 있으면 alert를 띄워준다.", () => {
      const stub = cy.stub();
      cy.on("window:alert", stub);
      getWinningNumberInput().each(($input, index) => {
        cy.wrap($input).type(index + 1);
      });
      getBonusNumberInput().type(6);
      getOpenWinningResultButton()
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(DUPLICATE_EXPECT_NUMBER);
        });
    });
  });

  context("당첨 통계 모달을 테스트한다.", () => {
    beforeEach(() => {
      cy.visit("../../index.html");
      getPurchaseAmountInput().type("3000");
      getPurchaseButton().click();
      getWinningNumberInput().each(($input, index) => {
        cy.wrap($input).type(index + 1);
      });
      getBonusNumberInput().type(6);
      getOpenWinningResultButton().click();
    });

    it("결과 확인하기 버튼을 눌렀을 때 당첨 통계 모달이 띄워진다.", () => {
      getWinningResultModal().should("be.visible");
    });

    it("닫기 버튼을 눌렀을때 당첨 통계 모달이 닫아진다.", () => {
      getWinningResultModalCloseButton().click();
      getWinningResultModal().should("not.be.visible");
    });

    // 랜덤하게 표시될텐데 테스트에서 어떻게 확인할 수 있을까?
    it("각 당첨금에 해당하는 당첨 갯수가 올바르게 표시된다.", () => {});
    it("총 수익률이 올바르게 표시된다.", () => {});

    it("다시 시작하기 버튼이 있다.", () => {
      getResetButton().should("be.visible");
    });

    it("다시 시작하기 버튼을 누르면 당첨 통계 모달은 닫히고 초기 페이지로 돌아간다.", () => {
      getResetButton().click();
      getWinningResultModal().should("not.be.visible");
      getPurchaseResultSection().should("not.be.visible");
      getExpectWinningResultSection.should("not.be.visible");
      getPurchaseAmountInput().should("have.value", "");
    });
  });
});
