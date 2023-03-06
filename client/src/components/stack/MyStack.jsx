import styled from "styled-components";
import CardsRow from "../CardsRow/CardsRow";

const Root = styled.div`
  position: fixed;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  --cardWidth: var(--cardWidthBigger);
`;

export default function PlayerStack() {
    const { player, currentPlayer } = useSelector((state) => ({
        player: state.game.players[0],
        currentPlayer: state.game.currentPlayer,
    }));
    const cards = player?.cards || [];

    return (
        <Root>
            <CardsRow
                cards={cards}
                highlight={true}
                cardProps={{ selectable: true }}
            />
        </Root>
    );
}
