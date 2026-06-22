import { IResourceMap } from '../models/resource-map.interface';
import { ICardDeck } from '../models/card-deck.interface';

export const GameResourceMap: IResourceMap[] = [
    {
        id: 'rummy',
        image_path: 'images/rummy_cards.png',
        title: 'Rummy',
        description: 'A classic card game where players aim to form sets and runs of cards to win.',
        link: '/games/rummy',
    },
    {
        id: 'connect_four',
        image_path: 'images/connect_four.png',
        title: 'Connect Four',
        description: 'A two-player connection game where the goal is to connect four of your pieces in a row.',
        link: '/games/connect-four',
    },
]

export const CardDeckMap: ICardDeck[] = [
    // === HEARTS ===
    { suit: 'hearts', rank: '2', value: '2_hearts', image_path: '/images/cards/2_of_hearts.svg' },
    { suit: 'hearts', rank: '3', value: '3_hearts', image_path: '/images/cards/3_of_hearts.svg' },
    { suit: 'hearts', rank: '4', value: '4_hearts', image_path: '/images/cards/4_of_hearts.svg' },
    { suit: 'hearts', rank: '5', value: '5_hearts', image_path: '/images/cards/5_of_hearts.svg' },
    { suit: 'hearts', rank: '6', value: '6_hearts', image_path: '/images/cards/6_of_hearts.svg' },
    { suit: 'hearts', rank: '7', value: '7_hearts', image_path: '/images/cards/7_of_hearts.svg' },
    { suit: 'hearts', rank: '8', value: '8_hearts', image_path: '/images/cards/8_of_hearts.svg' },
    { suit: 'hearts', rank: '9', value: '9_hearts', image_path: '/images/cards/9_of_hearts.svg' },
    { suit: 'hearts', rank: '10', value: '10_hearts', image_path: '/images/cards/10_of_hearts.svg' },
    { suit: 'hearts', rank: 'jack', value: 'jack_hearts', image_path: '/images/cards/jack_of_hearts.svg' },
    { suit: 'hearts', rank: 'queen', value: 'queen_hearts', image_path: '/images/cards/queen_of_hearts.svg' },
    { suit: 'hearts', rank: 'king', value: 'king_hearts', image_path: '/images/cards/king_of_hearts.svg' },
    { suit: 'hearts', rank: 'ace', value: 'ace_hearts', image_path: '/images/cards/ace_of_hearts.svg' },

    // === DIAMONDS ===
    { suit: 'diamonds', rank: '2', value: '2_diamonds', image_path: '/images/cards/2_of_diamonds.svg' },
    { suit: 'diamonds', rank: '3', value: '3_diamonds', image_path: '/images/cards/3_of_diamonds.svg' },
    { suit: 'diamonds', rank: '4', value: '4_diamonds', image_path: '/images/cards/4_of_diamonds.svg' },
    { suit: 'diamonds', rank: '5', value: '5_diamonds', image_path: '/images/cards/5_of_diamonds.svg' },
    { suit: 'diamonds', rank: '6', value: '6_diamonds', image_path: '/images/cards/6_of_diamonds.svg' },
    { suit: 'diamonds', rank: '7', value: '7_diamonds', image_path: '/images/cards/7_of_diamonds.svg' },
    { suit: 'diamonds', rank: '8', value: '8_diamonds', image_path: '/images/cards/8_of_diamonds.svg' },
    { suit: 'diamonds', rank: '9', value: '9_diamonds', image_path: '/images/cards/9_of_diamonds.svg' },
    { suit: 'diamonds', rank: '10', value: '10_diamonds', image_path: '/images/cards/10_of_diamonds.svg' },
    { suit: 'diamonds', rank: 'jack', value: 'jack_diamonds', image_path: '/images/cards/jack_of_diamonds.svg' },
    { suit: 'diamonds', rank: 'queen', value: 'queen_diamonds', image_path: '/images/cards/queen_of_diamonds.svg' },
    { suit: 'diamonds', rank: 'king', value: 'king_diamonds', image_path: '/images/cards/king_of_diamonds.svg' },
    { suit: 'diamonds', rank: 'ace', value: 'ace_diamonds', image_path: '/images/cards/ace_of_diamonds.svg' },

    // === CLUBS ===
    { suit: 'clubs', rank: '2', value: '2_clubs', image_path: '/images/cards/2_of_clubs.svg' },
    { suit: 'clubs', rank: '3', value: '3_clubs', image_path: '/images/cards/3_of_clubs.svg' },
    { suit: 'clubs', rank: '4', value: '4_clubs', image_path: '/images/cards/4_of_clubs.svg' },
    { suit: 'clubs', rank: '5', value: '5_clubs', image_path: '/images/cards/5_of_clubs.svg' },
    { suit: 'clubs', rank: '6', value: '6_clubs', image_path: '/images/cards/6_of_clubs.svg' },
    { suit: 'clubs', rank: '7', value: '7_clubs', image_path: '/images/cards/7_of_clubs.svg' },
    { suit: 'clubs', rank: '8', value: '8_clubs', image_path: '/images/cards/8_of_clubs.svg' },
    { suit: 'clubs', rank: '9', value: '9_clubs', image_path: '/images/cards/9_of_clubs.svg' },
    { suit: 'clubs', rank: '10', value: '10_clubs', image_path: '/images/cards/10_of_clubs.svg' },
    { suit: 'clubs', rank: 'jack', value: 'jack_clubs', image_path: '/images/cards/jack_of_clubs.svg' },
    { suit: 'clubs', rank: 'queen', value: 'queen_clubs', image_path: '/images/cards/queen_of_clubs.svg' },
    { suit: 'clubs', rank: 'king', value: 'king_clubs', image_path: '/images/cards/king_of_clubs.svg' },
    { suit: 'clubs', rank: 'ace', value: 'ace_clubs', image_path: '/images/cards/ace_of_clubs.svg' },

    // === SPADES ===
    { suit: 'spades', rank: '2', value: '2_spades', image_path: '/images/cards/2_of_spades.svg' },
    { suit: 'spades', rank: '3', value: '3_spades', image_path: '/images/cards/3_of_spades.svg' },
    { suit: 'spades', rank: '4', value: '4_spades', image_path: '/images/cards/4_of_spades.svg' },
    { suit: 'spades', rank: '5', value: '5_spades', image_path: '/images/cards/5_of_spades.svg' },
    { suit: 'spades', rank: '6', value: '6_spades', image_path: '/images/cards/6_of_spades.svg' },
    { suit: 'spades', rank: '7', value: '7_spades', image_path: '/images/cards/7_of_spades.svg' },
    { suit: 'spades', rank: '8', value: '8_spades', image_path: '/images/cards/8_of_spades.svg' },
    { suit: 'spades', rank: '9', value: '9_spades', image_path: '/images/cards/9_of_spades.svg' },
    { suit: 'spades', rank: '10', value: '10_spades', image_path: '/images/cards/10_of_spades.svg' },
    { suit: 'spades', rank: 'jack', value: 'jack_spades', image_path: '/images/cards/jack_of_spades.svg' },
    { suit: 'spades', rank: 'queen', value: 'queen_spades', image_path: '/images/cards/queen_of_spades.svg' },
    { suit: 'spades', rank: 'king', value: 'king_spades', image_path: '/images/cards/king_of_spades.svg' },
    { suit: 'spades', rank: 'ace', value: 'ace_spades', image_path: '/images/cards/ace_of_spades.svg' }
];

export const BackOfCardImagePath = 'images/back_of_deck.png';