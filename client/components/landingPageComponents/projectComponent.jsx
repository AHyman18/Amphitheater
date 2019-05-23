import React from 'react';
import styled from 'styled-components';

const ProjectStyle = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;

  p {
    font-weight: 700;
    opacity: 1;
    padding: 2.5% 25%;
  }
`;
const ProjectComponent = () => {
  return (
    <ProjectStyle>
      <p>
        Bacon ipsum dolor amet bresaola pork belly shankle ribeye short ribs
        pork chop sirloin kevin tail shoulder meatball jowl leberkas. Cow kevin
        turducken ground round doner pork buffalo tail chuck picanha pork belly
        ham hock. Jowl alcatra kielbasa turkey shank. Landjaeger flank cupim
        turkey boudin venison. Tri-tip shankle picanha kielbasa beef capicola.
        Kielbasa andouille picanha beef t-bone cupim jerky tenderloin bacon
        leberkas kevin ham hock pork belly. Fatback filet mignon spare ribs,
        boudin biltong chuck tongue shoulder kielbasa pork buffalo corned beef
        kevin ham hock prosciutto. Jowl salami porchetta, meatloaf ribeye
        chicken turkey buffalo.
      </p>
      <p>
        Flank spare ribs strip steak drumstick bacon andouille pork belly
        sirloin tenderloin hamburger short loin. Cupim chuck t-bone, salami
        hamburger bacon short loin pork loin tenderloin prosciutto turducken
        ribeye picanha. Ball tip boudin prosciutto t-bone salami. Cow capicola
        venison biltong, doner ham hock rump shankle leberkas. Strip steak
        pancetta boudin filet mignon drumstick doner ground round burgdoggen.
      </p>
    </ProjectStyle>
  );
};
export default ProjectComponent;
