using System.Linq;
using System;
using System.IO;
using System.Xml.Schema;
using System.Text.RegularExpressions;

string[] input = File.ReadLines("/home/mono/RiderProjects/AdventOfCode/input").ToArray();

int totalCardRewards = 0;
List<Card> cardCollection = new List<Card>();

int cardCount = 1;

foreach (string card in input)
{
    string cardNumbers = card.Split(':')[1];
    string[] winningNumbersStrings = cardNumbers.Split('|')[0].Split(" ").Where(x => !string.IsNullOrEmpty(x)).ToArray();
    string[] myNumbersStrings = cardNumbers.Split('|')[1].Split(" ").Where(x => !string.IsNullOrEmpty(x)).ToArray();
    int[] winningNumbers = Array.ConvertAll(winningNumbersStrings, int.Parse);
    int[] myNumbers = Array.ConvertAll(myNumbersStrings, int.Parse);
    int cardValue = 0;
    int numberCount = 0;
    

    
    
    foreach (var number in myNumbers)
    {
        if (winningNumbers.Contains(number))
        {
            cardValue = (int)Math.Pow(2, numberCount);
            numberCount++;
        }
    }
    
    // Declare the cards
    var newCard = new Card();
    newCard.n = cardCount;
    newCard.winningNumbers = winningNumbers;
    newCard.playingNumbers = myNumbers;
    cardCollection.Add(newCard);

    newCard.matchingNumbers = numberCount;

    totalCardRewards += cardValue;
    cardCount++;

}

Console.WriteLine($"Part 1 Solution: {totalCardRewards}");

// Part 2

int scratchcardsCount = 0;
List<Card> rewardedCards = cardCollection;
List<Card> newRewardedCards = new List<Card>();
List<Card> totalRewardedCards = new List<Card>();
Boolean notFinished = true;
int count = 0;

while (notFinished)
{
    totalRewardedCards.AddRange(rewardedCards);
    for (int i = 0; i < rewardedCards.Count; i++)
    {
        var card = rewardedCards[i];
        newRewardedCards.AddRange(checkRewardedCards(card));
        Console.WriteLine($"\t Checking Card #{card.n}, {checkRewardedCards(card).Count} rewarded.");
    }
    count++;

    
    rewardedCards = new List<Card>();
    
    Console.WriteLine($"Rewarded Card Size after Removal: {rewardedCards.Count}");

    rewardedCards.AddRange(newRewardedCards);
    newRewardedCards = new List<Card>();
    
    Console.WriteLine($"Rewarded Card Size after new Cards: {rewardedCards.Count}");
    
    if (rewardedCards.Count == 0)
    {
        notFinished = false;
    }
    
}

Console.WriteLine($"\n \n # Total Rewarded Cards: {totalRewardedCards.Count}, {count} cycles");

List<Card> checkRewardedCards(Card card)
{
    List<Card> cardCopies = new List<Card>();
    
    for (int i = card.n + 1; i <= card.n + card.matchingNumbers; i++ )
    {
        cardCopies.Add(cardCollection[i-1]);
    }
    
    return cardCopies;
}
class Card
{
    public int n;
    public int matchingNumbers;
    public int[] winningNumbers;
    public int[] playingNumbers;

}
