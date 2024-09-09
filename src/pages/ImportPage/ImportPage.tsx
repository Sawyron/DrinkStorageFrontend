import { ChangeEvent, FC, FormEvent, useCallback, useState } from 'react';
import ImportService from '../../services/ImportService';
import { useNavigate } from 'react-router-dom';
import classes from './ImportPage.module.css';

const ImportPage: FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<'error' | 'ok' | 'not-send'>('not-send');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handleFileChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length !== 1) {
      return;
    }
    const file = files[0];
    setFile(file);
  };
  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (file) {
        try {
          const response = await ImportService.sendProductsAsCsv(file);
          if (response.status === 200) {
            setState('ok');
          } else {
            setState('error');
          }
        } catch (error) {
          setError(String(error));
          setState('error');
        }
      }
    },
    [file]
  );

  if (state === 'error' && error) {
    return (
      <>
        <p>{error}</p>
        <button className="yellow-btn" onClick={() => navigate('/')}>
          Каталог товаров
        </button>
      </>
    );
  }
  if (state === 'ok') {
    return (
      <>
        <p>Упех</p>
        <button className="yellow-btn" onClick={() => navigate('/')}>
          Каталог товаров
        </button>
      </>
    );
  }

  return (
    <>
      <h3>Формат xlsx:</h3>
      <p>Name|Price|Quantity|ImageUrl|BrandId</p>
      <div className={classes['form']}>
        <form onSubmit={handleSubmit}>
          <input type="file" required onChange={handleFileChanged} />
          <label htmlFor="upload"></label>
          <input type="submit" name="upload"></input>
        </form>
      </div>
    </>
  );
};

export default ImportPage;
