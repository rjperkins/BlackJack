function Blackjack () {

    const suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
    const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
    let deck;
    let bust = false;
    let playerHand;
    let dealerHand;
    let playerHandValue;
    let dealerHandValue;

    $("#hit").hide();
    $("#stand").hide();

    class Card {
        constructor(suit, value) {
            this.suit = suit;
            this.value = value;
        }
    }

    class Deck {
        constructor() {
            this.deck = [];
        }

        createDeck() {
            for(let suit of suits) {
                for(let value of values) {
                    this.deck.push(new Card(suit, value));
                }
            }
            return this.deck;
        }

        shuffle() {
            for(let i=0; i<this.deck.length-1; i++) {
                let j = Math.floor(Math.random()*this.deck.length);
                let temp = this.deck[j];
                this.deck[j] = this.deck[i];
                this.deck[i] = temp;
            }
            return this.deck;
        }

        deal(num) {
            let hand = [];
            for (let i=0; i<num; i++) {
                hand.push(this.deck.pop());
            }
            return hand;
        }
    }

    function handValue(hand) {
        let currentHandValue = 0;
        let aces = 0;
        let value = 0;
        for (let i = 0; i < hand.length; i++) {
            if (hand[i].value === 'Jack' || hand[i].value === 'Queen' || hand[i].value === 'King') {
                value = 10;
            } else if (hand[i].value === 'Ace') {
                value = 1;
                aces++
            } else {
                value = hand[i].value
            }
            currentHandValue += value;
        }
        while (aces > 0 && currentHandValue <= 11) {
            currentHandValue += 10;
        }
        return currentHandValue;
    }

    function hit(hand) {
        hand.push(deck.deal(1)[0]);
        playerHandValue = handValue(hand);
        $("#playerHandValue").html(`You have ${playerHandValue}`);

        for(let i = 0; i < playerHand.length; i++) {
            let crdName = `${playerHand[i]['value']}_of_${playerHand[i]['suit']}`;
            $("#playerHandCard"+(i+1)).html('<img src ="./CardImages/'+crdName+'.png" alt="card"/>')
        }

        if (playerHandValue > 21) {
            bust = true;
            $("#gameStatus").html(`Bust! You Lose!`);
            $("#hit").hide();
            $("#stand").hide();
            $("#newGame").show();
        }
    }

    function stand() {
        bust = false;
        $("#hit").hide();
        $("#stand").hide();
        dealerPlay()

    }

    function dealerPlay() {
        let crdName = `${dealerHand[1]['value']}_of_${dealerHand[1]['suit']}`;
        $("#dealerHandCard2").html('<img src="./CardImages/' + crdName + '.png" alt="card" />');
        dealerHandValue = handValue(dealerHand);

        if (dealerHandValue === 21 && dealerHand.length === 2) {
            $("#dealerHandValue").html(`Dealer has Blackjack!`)
        } else if (dealerHandValue >= 17) {
            $("#dealerHandValue").html(`Dealer has ${dealerHandValue}`);
        } else {
            while (dealerHandValue < 17) {
                dealerHand.push(deck.deal(1)[0]);
                dealerHandValue = handValue(dealerHand);
                $("#dealerHandValue").html(`Dealer has ${dealerHandValue}`);
                for (let i = 0; i < dealerHand.length; i++) {
                    let crdName = `${dealerHand[i]['value']}_of_${dealerHand[i]['suit']}`;
                    $("#dealerHandCard" + (i + 1)).html('<img src ="./CardImages/' + crdName + '.png" alt="card"/>')
                }
            }
        }
        gameOver()
    }

    function blackjackPlayer() {
        for (let i = 0; i < dealerHand.length; i++) {
            let crdName;
            crdName = `${dealerHand[i]['value']}_of_${dealerHand[i]['suit']}`;
            $("#dealerHandCard" + (i + 1)).html('<img src ="./CardImages/' + crdName + '.png" alt="card"/>');
            crdName = `${playerHand[i]['value']}_of_${playerHand[i]['suit']}`;
            $("#playerHandCard" + (i + 1)).html('<img src="./CardImages/' + crdName + '.png" alt="card"/>');
        }
        $("#hit").hide();
        $("#stand").hide();
        $("#newGame").show();
        if(dealerHandValue === 21) {
            $("#gameStatus").html(`Both have Blackjack. No winner.`);
            $("#dealerHandValue").html(`Dealer has Blackjack`);
            $("#playerHandValue").html(`You have Blackjack`)
        } else {
            $("#gameStatus").html(`Blackjack. You win!`);
            $("#dealerHandValue").html(`Dealer has ${handValue(dealerHand)}`);
            $("#playerHandValue").html(`You have Blackjack`)
        }
    }

    function gameOver() {
        if (dealerHandValue > 21) {
            $("#gameStatus").html(`Dealer Bust. You Win!`)
        } else if (dealerHandValue === 21 && dealerHand.length === 2) {
            $("#gameStatus").html(`Dealer has Blackjack. Dealer Wins!`);
        } else if (dealerHandValue <= 21 && dealerHandValue > playerHandValue) {
            $("#gameStatus").html(`Dealer has ${dealerHandValue}. Dealer Wins!`);
        } else if (dealerHandValue <= 21 && dealerHandValue < playerHandValue){
            $("#gameStatus").html(`You Win!`);
        } else {
            $("#gameStatus").html(`Push. No winner.`);
        }

        $("#newGame").show()
    }

    function newGame() {

        deck = new Deck();
        deck.createDeck();
        deck.shuffle();

        playerHand = deck.deal(2);
        dealerHand = deck.deal(2);

        for(let i = 0; i < 8; i++) {
            $("#dealerHandCard"+(i+1)).empty();
        }
        for(let i = 0; i < 8; i++) {
            $("#playerHandCard" + (i + 1)).empty();
        }


        $("#dealerHandValue").empty();
        $("#playerHandValue").empty();
        $("#gameStatus").empty();

        playerHandValue = handValue(playerHand);

        if (playerHandValue === 21) {
            blackjackPlayer();
            return;
        } else {
            $("#playerHandValue").html(`You have ${playerHandValue}`)

        }
        $("#hit").show();
        $("#stand").show();

        let crdName = `${dealerHand[0]['value']}_of_${dealerHand[0]['suit']}`;
        $("#dealerHandCard1").html('<img src="./CardImages/'+crdName+'.png" alt="card"/>');

        $("#dealerHandCard2").html('<img src ="./CardImages/Back_of_Card.png" alt="card" />');
        for(let i = 0; i < playerHand.length; i++) {
            let crdName = `${playerHand[i]['value']}_of_${playerHand[i]['suit']}`;
            $("#playerHandCard"+(i+1)).html('<img src ="./CardImages/'+crdName+'.png" alt="card"/>')

        }
        $("#newGame").hide();
    }

    $("#hit").on("click", function () {
        hit(playerHand);
    });

    $("#stand").on("click", function () {
        stand();
    });

    $("#newGame").on("click", function () {
        newGame();
    });

}

Blackjack();