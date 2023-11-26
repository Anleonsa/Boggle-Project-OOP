import css from './RoomCreator.module.css'

const RoomCreator = () => {
  return (
    <section className={css.roomCreator}>
      <div className={css.roomCreator_titleContainer}>
        <h2 className={css.roomCreator__title}>Crea una sala</h2>  
      </div>
      <div className={css.roomCreator__formContainer}>
        <form className={css.roomCreator__form}>
          <div>
            <label htmlFor="">Tamaño de la cuadrícula</label>
            <input type="range" />
          </div>
          <div className={css.roomCreator__form__optionContainer}>
            <label htmlFor="">Tiempo de juego</label>
            <input type="range" />
            <span className={css.roomCreator__form__optionViewer}></span>
          </div>
          <input className={css.roomCreator_btnSubmit + " clickable"} type="submit" value='Crear'/>
        </form>
      </div>
    </section>
  );
}

export default RoomCreator;
