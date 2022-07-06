import styles from './styles/PrimaryButton.module.scss';
type PrimaryButtonProps = { text: string; disabled?: boolean };
const PrimaryButton = ({ text, disabled = false }: PrimaryButtonProps) => {
  return (
    <button className={styles.primary_button} disabled={disabled}>
      {text}
    </button>
  );
};

export default PrimaryButton;
